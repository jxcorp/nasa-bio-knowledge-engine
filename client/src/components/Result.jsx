// components/ResultsList.jsx
import React from 'react';

const ResultsList = ({ results, isLoading, error }) => {
    if (isLoading) {
        return <div className="p-4 text-center text-lg">Loading results...</div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500 border border-red-500">Error: {error}</div>;
    }

    if (results.length === 0) {
        return <div className="p-4 text-center text-gray-500">No datasets found matching your criteria.</div>;
    }

    return (
        <div className="space-y-6">
            {results.map((item) => (
                <div key={item.accession} className="p-5 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
                    <h3 className="text-xl font-semibold text-purple-600 hover:text-purple-800">
                        <a href={`https://osdr.nasa.gov/bio/repo/search?q=${item.sourceUrl}&data_source=cgene,alsda,esa&data_type=study`} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </a>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Accession: {item.accession}</p>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <p><strong>Organism:</strong> {item.organism}</p>
                        <p><strong>Factor:</strong> {item.factor}</p>
                        <p><strong>Assay:</strong> {item.assay}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResultsList;