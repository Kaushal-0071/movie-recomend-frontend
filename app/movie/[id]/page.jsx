"use client";

import { LikedMoviesContext } from "@/app/context/LikedMoviesContext";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get movie title from URL
  const {LikedMovies, setLikedMovies} = useContext(LikedMoviesContext); // Import LikedMoviesContext  
  const decodedTitle = decodeURIComponent(id); // Decode the title

  useEffect(() => {
    if (LikedMovies.length > 0) {
      localStorage.setItem("likedMovies", JSON.stringify(LikedMovies));
    }
  }, [LikedMovies]);
const router = useRouter(); 
  useEffect(() => {
    const fetchContentBased = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch("http://127.0.0.1:5000/content-based", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movies: [decodedTitle] }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Recommended Movies:", data.recommended_movies);
        setMovies(data.recommended_movies);
      } catch (error) {
        console.error("Error fetching content-based recommendations:", error);
        setMovies([]); // Set to empty array on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (decodedTitle) {
      fetchContentBased();
    }
  }, [decodedTitle]);
useEffect(() => {
  console.log("Liked Movies:", LikedMovies);  },[LikedMovies]); // Log liked movies whenever they change

  const setlikes=(movie) => {
    if(LikedMovies.includes(movie)) {
     setLikedMovies(LikedMovies.filter((m) => m !== movie)); // Remove the movie if already liked
    }else{
      setLikedMovies([...LikedMovies, movie]); // Add the new movie to the liked movies
    }
     // Log the liked movies

  }

  function goToMoviePage(movieTitle) {
    const encodedTitle = encodeURIComponent(movieTitle); // Encode title for URL
    router.push(`/movie/${encodedTitle}`); // Navigate to /movie/[title]
  }

  return (
    <>
      <div className="mt-4 text-5xl font-bold mb-4">{decodedTitle}</div>

      {/* ✅ Button is now outside of the fetching logic */}
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setlikes(decodedTitle)}>
        Like
      </Button>

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Recommended Movies</h1>
        <div className="w-full max-w-2xl">
          {loading ? ( // ✅ Show loading while fetching
            <p className="text-gray-400 text-lg">Loading recommendations...</p>
          ) : movies.length > 0 ? (
            <ul className="bg-gray-800 rounded-lg p-4 shadow-lg">
              {movies.map((movie, index) => (
                <Button key={index} onClick={() => goToMoviePage(movie)}>
                <li
                  key={index}
                  className="p-3 border-b border-gray-700 last:border-none hover:bg-gray-700 rounded-md cursor-pointer transition duration-200"
                >
                  🎬 {movie}
                </li>
                </Button>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-lg">No recommendations available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Movie;
