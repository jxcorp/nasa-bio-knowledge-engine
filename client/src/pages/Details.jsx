import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Define the theme color as a constant
const NASA_BLUE = "#0B3D91";
const NASA_BLUE_HOVER = "#082D70"; // Slightly darker for hover effect

// The base URL for the remote Bio Knowledge Engine API
const BASE_API_URL = "https://bio-knowledge-engine.onrender.com";

// Helper function to format keys (e.g., 'study_title' -> 'Study Title')
const formatKey = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/_/g, " ");


/* -------------------------------------------------------------------------- */
/* HELPER COMPONENT: DetailsSidebar                */
/* -------------------------------------------------------------------------- */

const DetailsSidebar = ({ osdrId, datasetTitle, authors, description }) => (
  // 💡 CSS Change: Sidebar container styling (Improved text base color)
  <aside 
    className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto w-full lg:w-96 p-6 space-y-8 shadow-2xl 
               bg-white dark:bg-gray-900 dark:text-gray-100" // text-gray-100 for better readability
  >
    {/* --- Core Metadata Header --- */}
    <div 
      // 💡 CSS Change: Header border
      className="border-b pb-4 border-gray-200 dark:border-gray-700"
    >
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: NASA_BLUE }} // NASA_BLUE remains
      >
        NASA OSDR ID: {osdrId}
      </p>
      <h1 
        // 💡 CSS Change: Title text color (Ensure it's prominent)
        className="text-3xl font-extrabold leading-snug break-words 
                   text-gray-900 dark:text-white" // white for maximum contrast
      >
        {datasetTitle}
      </h1>
      <p 
        // 💡 CSS Change: Author text color (Better contrast)
        className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        Authors: {Array.isArray(authors) ? authors.join(", ") : authors}
      </p>
    </div>

    {/* --- Study Summary --- */}
    <div>
      <h2
        className="text-sm font-bold uppercase mb-2"
        style={{ color: NASA_BLUE_HOVER }} // NASA_BLUE_HOVER remains
      >
        Study Summary
      </h2>
      <p 
        // 💡 CSS Change: Summary text color (Better contrast)
        className="text-sm leading-relaxed text-gray-700 dark:text-gray-200"
      >
        {description}
      </p>
    </div>

    {/* --- Navigation Table of Contents (TOC) --- */}
    <div 
      // 💡 CSS Change: TOC border
      className="pt-4 border-t border-gray-100 dark:border-gray-800"
    >
      <h2 
        // 💡 CSS Change: TOC header color (Ensure it's prominent)
        className="text-sm font-bold uppercase mb-3 text-gray-900 dark:text-white"
      >
        Quick Navigation
      </h2>
      <nav className="space-y-2">
        <a
          href="#metadata"
          // 💡 CSS Change: TOC link colors (Better contrast)
          className="block text-sm font-medium transition duration-150 
                     text-gray-700 hover:text-indigo-600 
                     dark:text-gray-300 dark:hover:text-cyan-400"
        >
          &bull; Additional Parameters
        </a>
        <a
          href="#files"
          // 💡 CSS Change: TOC link colors (Better contrast)
          className="block text-sm font-medium transition duration-150 
                     text-gray-700 hover:text-indigo-600 
                     dark:text-gray-300 dark:hover:text-cyan-400"
        >
          &bull; Associated Files
        </a>
        <Link
          to="/engine"
          // 💡 CSS Change: "Back" link colors
          className="mt-4 inline-block text-sm font-bold hover:underline
                     text-indigo-600 dark:text-cyan-400"
        >
          &larr; Back to Dashboard
        </Link>
      </nav>
    </div>
  </aside>
);


/* -------------------------------------------------------------------------- */
/* HELPER COMPONENT: MetadataList                  */
/* -------------------------------------------------------------------------- */

const MetadataList = ({ metadata, excludeKeys = [] }) => {
  const data = metadata.data || metadata;

  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    // 💡 CSS Change: No metadata text color
    return <p className="text-gray-500 dark:text-gray-300">No additional metadata available.</p>;
  }

  const filteredEntries = Object.entries(data).filter(
    ([key, value]) =>
      !excludeKeys.includes(key) && typeof value !== "object" && value !== null
  );

  if (filteredEntries.length === 0) {
    // 💡 CSS Change: No metadata text color
    return <p className="text-gray-500 dark:text-gray-300">No additional metadata available.</p>;
  }

  return (
    // 💡 CSS Change: Metadata box background and border/shadow
    <div className="p-6 shadow-xl rounded-lg bg-white dark:bg-gray-800">
      <h3
        id="metadata" // Anchor for sidebar TOC
        // 💡 CSS Change: Metadata header text and border color
        className="text-2xl font-semibold mb-4 pb-2 
                   text-gray-800 border-b border-gray-200
                   dark:text-white dark:border-gray-700" // White text
      >
        Additional Study Parameters
      </h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {filteredEntries.map(([key, value]) => (
          <div 
            key={key} 
            // 💡 CSS Change: Individual item border
            className="pb-2 border-b border-gray-100 dark:border-gray-700"
          >
            <dt
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: NASA_BLUE }} // NASA_BLUE remains
            >
              {formatKey(key)}
            </dt>
            <dd 
              // 💡 CSS Change: Value text color (Better contrast)
              className="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100"
            >
              {Array.isArray(value) ? value.join(", ") : String(value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENT: FilesGrid                     */
/* -------------------------------------------------------------------------- */

const FilesGrid = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <div className="mt-8">
        <h2 
          // 💡 CSS Change: File header text color
          className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white"
        >
          Associated Files
        </h2>
        {/* 💡 CSS Change: No files text color */}
        <p className="text-gray-500 italic dark:text-gray-300">No files found for this dataset.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 
        id="files" 
        // 💡 CSS Change: File header text color
        className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white"
      >
        Associated Files ({files.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {files.map((file, index) => (
          <div
            key={index}
            // 💡 CSS Change: File card background, border, shadow, hover effect
            className="p-5 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between rounded-lg 
                       bg-white border border-gray-200 
                       dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <p
                className="text-xs font-semibold uppercase"
                style={{ color: NASA_BLUE }} // NASA_BLUE remains
              >
                {file.type || "FILE"}
              </p>
              <h3 
                // 💡 CSS Change: File name text color (Better contrast)
                className="text-base font-medium mt-1 break-words 
                           text-gray-900 dark:text-gray-100"
              >
                {file.file_name || "Unnamed File"}
              </h3>
            </div>

            <div className="mt-4">
              {file.url && (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 transition rounded-md"
                  style={{
                    // NASA_BLUE styles remain for the button
                    backgroundColor: NASA_BLUE,
                    "--tw-ring-color": NASA_BLUE,
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = NASA_BLUE_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = NASA_BLUE)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


/* -------------------------------------------------------------------------- */
/* MAIN PAGE COMPONENT: OSDRDetailsPage              */
/* -------------------------------------------------------------------------- */

const OSDRDetailsPage = () => {
  const { osdrId } = useParams();

  const [metadata, setMetadata] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatasetDetails = async () => {
      setLoading(true);
      setError(null);

      const metadataUrl = `${BASE_API_URL}/dataset/${osdrId}/metadata/`;
      const filesUrl = `${BASE_API_URL}/dataset/${osdrId}/files`;

      try {
        const [metadataResponse, filesResponse] = await Promise.all([
          fetch(metadataUrl),
          fetch(filesUrl),
        ]);

        if (!metadataResponse.ok || !filesResponse.ok) {
          throw new Error(
            `Failed to fetch data: Metadata Status ${metadataResponse.status}, Files Status ${filesResponse.status}`
          );
        }

        const metadataJson = await metadataResponse.json();
        const filesJson = await filesResponse.json();

        setMetadata(metadataJson);

        const rawFiles = filesJson?.[osdrId]?.files;
        if (rawFiles) {
          const filesArray = Object.entries(rawFiles).map(
            ([fileName, fileDetails]) => ({
              file_name: fileName,
              url: fileDetails.URL,
              rest_url: fileDetails.REST_URL,
              type: fileName.split(".").pop(),
            })
          );
          setFiles(filesArray);
        } else {
          setFiles([]);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(`Could not load dataset details. Error: ${err.message}.`);
      } finally {
        setLoading(false);
      }
    };

    if (osdrId) {
      fetchDatasetDetails();
    }
  }, [osdrId]);

  if (loading) {
    return (
      // 💡 CSS Change: Loading page background
      <div className="text-center p-12 flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <img
          src="/loader.gif"
          alt="Loading content..."
          className="w-20 h-20"
        />
      </div>
    );
  }

  if (error) {
    return (
      // 💡 CSS Change: Error page background and card styling
      <div className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
        <div 
          className="max-w-6xl mx-auto p-8 shadow-2xl rounded-lg 
                     bg-white dark:bg-gray-800"
        >
          <h1 
            // 💡 CSS Change: Error title text color
            className="text-3xl font-bold mb-4 text-red-600"
          >
            Error Loading Data
          </h1>
          <p 
            // 💡 CSS Change: Error message text color (Better contrast)
            className="text-gray-700 dark:text-gray-200"
          >
            {error}
          </p>
        </div>
      </div>
    );
  }

  const coreMetadata = metadata?.[osdrId]?.metadata || metadata;

  // Extract key fields for prominent display
  const datasetTitle =
    coreMetadata["study publication title"] || `Dataset: ${osdrId}`;
  const authors = coreMetadata["study publication author list"] || "N/A";
  const description =
    coreMetadata["study description"] || "No study description provided.";

  // Keys to exclude from the main MetadataBlock because they are in the header/sidebar
  const excludeFromBlock = [
    "study publication title",
    "study publication author list",
    "study description",
    "name",
  ];

  return (
    // 💡 CSS Change: Main page container background
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900">
      
      {/* --- LEFT SIDEBAR (Sticky Context Panel) --- */}
      <DetailsSidebar
        osdrId={osdrId}
        datasetTitle={datasetTitle}
        authors={authors}
        description={description}
      />

      {/* --- RIGHT MAIN CONTENT (Scrollable Details) --- */}
      <main className="flex-1 p-4 sm:p-8 space-y-10 lg:pl-12">
        
        {/* --- 1. Metadata Details Block --- */}
        <section>
          <MetadataList
            metadata={coreMetadata}
            excludeKeys={excludeFromBlock}
          />
        </section>

        {/* --- 2. Files Grid Section --- */}
        <section>
          <FilesGrid files={files} />
        </section>
        
        {/* 💡 CSS Change: Footer spacing div (optional, but ensures text contrast) */}
        <div className="h-10 dark:bg-gray-900"></div> 
      </main>
    </div>
  );
};

export default OSDRDetailsPage;