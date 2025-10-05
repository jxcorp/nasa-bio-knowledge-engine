// src/utils/osdrFetcher.js (New or modified file)
import axios from "axios";

const OSDR_DATASETS_BASE_ENDPOINT = "https://bio-knowledge-engine.onrender.com/datasets";//https://bio-knowledge-engine.onrender.com/datasets
export async function fetchOSDRData(offset = 0,limit=11) {
  try {
   
    
    const fetchURL = `${OSDR_DATASETS_BASE_ENDPOINT}?offset=${offset}&limit=${limit}}`;
    
    const apiResponse = await axios.get(fetchURL);
    const rawOSDResults = apiResponse.data || [];

    return rawOSDResults.map((studySummary) => {
      return {
        id: studySummary.id,
        title: studySummary.title || `OSDR Study: ${studySummary.id}`,
        documentLink: studySummary.documentLink || null,
        sourceType: "OSDR",
        authors:studySummary.authors||[],
        startdate:studySummary.startdate||"",
        enddate:studySummary.enddate||"",
        publicationDate:studySummary.publicationDate||"", 
      };
    });
  } catch (error) {
    console.error(
      "Failed to fetch OSDR API data:",
      error.message,
      error.response?.data
    );
    return []; // Return an empty array on failure
  }
}
