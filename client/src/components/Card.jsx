// src/components/PaperCard.js (Clean, Minimalist Design)

import React, { useState } from "react";
import { Link } from "react-router-dom";

// Define the maximum number of characters to display before truncation
const MAX_TITLE_LENGTH = 80; // Using 100 characters for a good balance

const PaperCard = ({ paper }) => {
  // Declare hooks at the top
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback logic for authors and publication date
  const rawAuthors = paper.publication_authors || paper.authors;

  const authorList = 
    Array.isArray(rawAuthors) 
      ? rawAuthors 
      : typeof rawAuthors === 'string' 
        ? rawAuthors.split(',').map(name => name.trim()) // Split string authors and clean up
        : []; 
  const publicationDate = paper.publicationDate || "";

  // Logic to show max 2 authors and add 'et al.'
  const authorsSnippet =
    authorList.length > 0
      ? authorList.slice(0, 2).join(", ") + 
        (authorList.length > 2 ? " et al." : "") 
      : "Authors N/A";
      
  // Determine if the title is long enough to require truncation
  // Note: We use a custom limit (100) now, not the one previously defined (50)
  const needsTruncation = paper.title.length > MAX_TITLE_LENGTH;

  // --- JS TRUNCATION LOGIC ---
  const displayTitle = 
    needsTruncation && !isExpanded
      ? paper.title.substring(0, MAX_TITLE_LENGTH) + '...' 
      : paper.title; 
  // ---------------------------


  return (
    // Minimalist Container: Clean white background, subtle border, gentle hover lift
   <div 
  // 💡 CSS Change: Card Background, Border, Shadow, Hover Effect
  className="p-5 rounded-lg transition duration-200 hover:shadow-lg group 
             bg-white border border-gray-200 
             dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl"
>
  
  {/* Title Block - Uses JS truncated title, NO line-clamp classes */}
  <h3
    // 💡 CSS Change: Title color
    className="text-xl font-bold transition duration-150 mb-1 
               text-blue-700 group-hover:text-blue-600 
               dark:text-cyan-400 dark:group-hover:text-cyan-300"
  >
    {displayTitle}
  </h3>
  
  {/* Toggle Button for Read More/Less */}
  {needsTruncation && (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      // 💡 CSS Change: Read More/Less button color
      className="text-xs font-semibold mt-1 mb-2 focus:outline-none 
                 text-blue-500 hover:text-blue-700 
                 dark:text-cyan-300 dark:hover:text-cyan-200"
    >
      {isExpanded ? "Read Less" : "Read More"}
    </button>
  )}


  {/* Metadata Bar (Simple text hierarchy) */}
  <div 
    // 💡 CSS Change: Base text color for metadata
    className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3 
               text-gray-600 dark:text-gray-300"
  >
    {/* Authors */}
    <p className="font-medium truncate max-w-xs">
      <span 
        // 💡 CSS Change: Author prefix color
        className="mr-1 text-gray-500 dark:text-gray-400"
      >
        By:
      </span>
      {authorsSnippet}
    </p>

    {/* Date - Only render if publicationDate exists to avoid orphaned separator */}
    {publicationDate && (
        <p 
          // 💡 CSS Change: Date text color
          className="text-gray-500 dark:text-gray-400"
        >
            <span className="mx-1">•</span> 
            {publicationDate}
        </p>
    )}
  </div>

  {/* Tags (Minimalist Badges) */}
  <div className="flex flex-wrap gap-2 mb-3">
    {/* Source Type Tag */}
    <span
      className={`
                text-xs font-semibold px-2 py-0.5 rounded-full 
                // 💡 CSS Change: Dynamic Tag Colors for Dark Mode
                ${
                  paper.sourceType === "Journal"
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                    : paper.sourceType === "OSDR"
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }
            `}
    >
      {paper.sourceType}
    </span>

    {/* Category Tag */}
    {paper.subjectCategories && paper.subjectCategories.length > 0 && (
      <span 
        // 💡 CSS Change: Tag color
        className="text-xs font-semibold px-2 py-0.5 rounded-full 
                   bg-green-50 text-green-700 
                   dark:bg-green-900 dark:text-green-300"
      >
        {paper.subjectCategories[0]}
      </span>
    )}
  </div>

  {/* View Document Link (Simple text link) */}
  <div className="mt-2 text-left">
    {paper.sourceType === "OSDR" ? (
      <Link
        to={`/osdr/${paper.id}`}
        // 💡 CSS Change: Link color
        className="text-sm font-semibold transition duration-150 underline-offset-2 hover:underline 
                   text-blue-600 hover:text-blue-800 
                   dark:text-cyan-500 dark:hover:text-cyan-400"
      >
        View Dataset
      </Link>
    ) : (
      <a
        href={paper.documentLink}
        target="_blank"
        rel="noopener noreferrer"
        // 💡 CSS Change: Link color
        className="text-sm font-semibold transition duration-150 underline-offset-2 hover:underline 
                   text-blue-600 hover:text-blue-800 
                   dark:text-cyan-500 dark:hover:text-cyan-400"
      >
        View Document{" "}
      </a>
    )}
  </div>
</div>
  );
};

export default PaperCard;