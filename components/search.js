"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/navigation';

const SearchCSV = () => {
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Import useRouter from next/router
  // Debounce function to limit search frequency
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    
    return debouncedValue;
  };
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Load CSV data only once
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/movies.csv");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            // Pre-process data - create a clean version for searching
            const processedData = result.data.map(movie => ({
              ...movie,
              searchableTitle: movie.title ? movie.title.toLowerCase() : ''
            }));
            setCsvData(processedData);
            setLoading(false);
          },
          error: (error) => {
            console.error("CSV Parsing Error:", error);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error loading CSV:", error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Memoize search results to prevent unnecessary re-calculations
  const filteredResults = useMemo(() => {
    if (!debouncedSearchTerm) return [];
    
    const lowercaseTerm = debouncedSearchTerm.toLowerCase();
    
    // Only perform search when search term is at least 2 characters
    if (lowercaseTerm.length < 2) return [];
    
    // Use the pre-processed searchableTitle for faster comparison
    return csvData
      .filter(movie => movie.searchableTitle.includes(lowercaseTerm))
      .slice(0, 100); // Limit results to improve rendering performance
  }, [debouncedSearchTerm, csvData]);
  
  // Update results when the memoized filtered results change
  useEffect(() => {
    setSearchResults(filteredResults);
  }, [filteredResults]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  function cleanTitle(title) {
    return title.replace(/\(\d{4}\)$/, "").trim();  // Removes "(YYYY)" at the end
}
function goToMoviePage(movieTitle) {
  const encodedTitle = encodeURIComponent(cleanTitle(movieTitle)); // Encode title for URL
  router.push(`/movie/${encodedTitle}`); // Navigate to /movie/[title]
}

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {loading && <div>Loading CSV data...</div>}
      
      {debouncedSearchTerm && !loading && (
        <div>
          <p className="mb-2">Found {searchResults.length} results</p>
          {searchResults.length > 0 ? (
            <ul className="border rounded divide-y">
                
              {searchResults.map((movie) => (
                <button key={movie.movieId} onClick={()=>goToMoviePage(movie.title)}>
                <li key={movie.movieId} className="p-2 hover:bg-gray-100">
                  <strong>{movie.title}</strong>
                </li>
                </button>
              ))}
             
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchCSV;