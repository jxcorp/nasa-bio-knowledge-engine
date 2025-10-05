// const OSDR_API_BASE_URL is assumed to be defined globally or passed in,
// but for this example, we'll define it locally again.
const OSDR_API_BASE_URL = "https://visualization.osdr.nasa.gov/biodata/api/v2";

// Use 'require' instead of 'import'
const axios = require("axios");

// Controller: Get all datasets
const getAllDatasets = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const datasetListUrl = `${OSDR_API_BASE_URL}/datasets`;

  try {
    const listResponse = await axios.get(datasetListUrl);
    const rawDatasetsObject = listResponse.data || {};

    const datasetIds = Object.entries(rawDatasetsObject).map(
      ([id, details]) => ({
        id,
        restUrl: details.REST_URL,
        metadataUrl: `${OSDR_API_BASE_URL}/dataset/${id}/metadata/`,
      })
    );

    const limitedDatasetIds = datasetIds.slice(offset, offset + limit);

    const metadataPromises = limitedDatasetIds.map(async (dataset) => {
      try {
        const metadataResponse = await axios.get(dataset.metadataUrl);

        const rawMetadata = metadataResponse.data[dataset.id].metadata;

        // Safely access mission data
        const mission = rawMetadata["mission"] || {};

        const title =
          rawMetadata["study publication title"] || // Use the publication title (often best)
          rawMetadata["study title"] || // Fallback to the general study title
          `OSDR Study: ${dataset.id}`; // Final fallback

        // Extract Document Link (using bracket notation for safety, though these keys don't have spaces)
        const documentLink =
          rawMetadata["project link"] || dataset.restUrl || `#${dataset.id}`;

        // --- CORRECTIONS HERE ---
        // 1. Corrected the key to remove extra spaces
        const authorsList = rawMetadata["study publication author list"];

        // 2. Safely access dates (was mission['start date'], now mission['end date'])
        const startDate = mission["start date"] || null;
        const endDate = mission["end date"] || null;
        // ------------------------

        // Extract and format public release date
        const publicDateTimestamp = rawMetadata["study_public_release_date"];
        const publicationDate = publicDateTimestamp
          ? new Date(publicDateTimestamp * 1000).toISOString().split("T")[0]
          : null;

        return {
          id: dataset.id,
          title: title,

          authors: authorsList || [],
          startdate: startDate,
          enddate: endDate,
          documentLink: documentLink,
          publicationDate: publicationDate,
          sourceType: "OSDR",
        };
      } catch (metadataError) {
        console.warn(
          `Warning: Failed to fetch metadata for ${dataset.id}. Skipping. Error: ${metadataError.message}`
        );

        return {
          id: dataset.id,
          title: `OSDR Study: ${dataset.id} (Metadata Fetch Failed)`,
          documentLink: dataset.restUrl,
          sourceType: "OSDR",
          authors: dataset.authors || [],
          startdate: dataset.startdate || "",
          enddate: dataset.enddate || "",
          publicationDate: dataset.publicationDate || "",
        };
      }
    });

    let finalResults = await Promise.all(metadataPromises);

    finalResults = finalResults.filter((result) => result !== null);

    res.json(finalResults);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: "Failed to aggregate datasets and metadata from external API.",
      details: error.message,
    });
  }
};

const proxyDatasetRequest = async (req, res) => {
  // req.originalUrl will start with /datasets or similar, we need to remove /api/v1/datasets/
  // Assuming the route is something like app.get('/api/v1/datasets/*', proxyDatasetRequest);

  // Use req.params if the route is defined to capture the dynamic part,
  // but sticking to your original logic for now:
  const nasaPath = req.originalUrl; // A common fix for proxy routes
  const externalUrl = `${OSDR_API_BASE_URL}${nasaPath}`;

  console.log(`[PROXY] Forwarding to: ${externalUrl}`);

  try {
    const apiResponse = await axios.get(externalUrl, {
      params: req.query, // forward query params too
    });
    res.json(apiResponse.data);
  } catch (error) {
    console.error(`Proxy error for ${externalUrl}: ${error.message}`);
    res.status(error.response?.status || 500).json({
      error: "Proxy request failed",
      details: error.message,
    });
  }
};

/* const OSDR_SEARCH_URL = "https://osdr.nasa.gov/osdr/data/search?";
 */

// Assuming OSDR_SEARCH_URL is defined as:
const OSDR_SEARCH_URL = "https://osdr.nasa.gov/osdr/data/search";
// Note: Removed the trailing '?' since Axios handles query params

const searchOsdrData = async (req, res) => {
  // 1. Determine the external URL based on your base endpoint
  // Assuming the frontend hits /datasets/search, the base URL is sufficient.
  const externalUrl = OSDR_SEARCH_URL;

  const proxyParams = req.query;

  console.log(`[PROXY] Forwarding search request to: ${externalUrl}`);
  console.log(`[PROXY] With parameters:`, proxyParams);

  try {
    // 2. Make the proxied request, forwarding all query parameters
    const apiResponse = await axios.get(externalUrl, {
      params: proxyParams,
      // Axios will handle encoding of ffield[] and fvalue[] arrays if present.
    });

    const rawData = apiResponse.data;

    // --- CRITICAL CORRECTION BASED ON RAW RESPONSE ---
    let rawResults = [];
    let totalHits = 0;

    // Check if the expected nested structure exists (rawData.hits.hits)
    if (rawData && rawData.hits && Array.isArray(rawData.hits.hits)) {
      // Success: Extract the array of actual results
      rawResults = rawData.hits.hits;
      totalHits = rawData.hits.total;
    } else {
      // Failure: Log the issue and confirm that we are sending an empty array
      console.error(
        "OSDR API returned non-standard/empty response for mapping. Keys:",
        Object.keys(rawData || {})
      );
    }
    // --- END CRITICAL CORRECTION ---

    // 3. Transform the extracted array of results
    const simplifiedResults = rawResults.map((hit) => {
      // The actual data is nested inside the '_source' property of each 'hit'
      const item = hit._source;

      return {
        accession: item.Accession,
        title: item["Study Title"] || item["Study Publication Title"] || "N/A",
        organism: item.organism || "N/A", // If organism is not directly in _source, this will be N/A
        factor: item["Study Factor Name"] || "N/A",
        assay: item["Study Assay Technology Type"] || "N/A",
        sourceUrl:
          item["Authoritative Source URL"] ||
          `https://osdr.nasa.gov/bio/repo/study/${item.Accession}`,
        // Pass the entire item for full detail on the frontend if needed
        rawData: item,
      };
    });

    // 4. Send the structured response back to the frontend
    res.json({
      results: simplifiedResults,
      total: totalHits,
      message: `Found ${totalHits} total results.`,
    });
  } catch (error) {
    console.error("OSDR Search Data API Error:", error.message);
    res.status(error.response?.status || 500).json({
      error: "Failed to execute search on OSDR Search API.",
      details: error.message,
    });
  }
};

 const searchOsdrDetails = async (req, res) => {
  const nasaPath = req.originalUrl; // A common fix for proxy routes
  const externalUrl = `https://osdr.nasa.gov/${nasaPath}`;

  console.log(`[PROXY] Forwarding to: ${externalUrl}`);

  try {
    const apiResponse = await axios.get(externalUrl, {
      params: req.query, // forward query params too
    });
    res.json(apiResponse.data);
  } catch (error) {
    console.error(`Proxy error for ${externalUrl}: ${error.message}`);
    res.status(error.response?.status || 500).json({
      error: "Proxy request failed",
      details: error.message,
    });
  }
};

  
// ... (Add this to your module exports)
module.exports = {
  getAllDatasets,
  proxyDatasetRequest,
  searchOsdrData,
  searchOsdrDetails
};
