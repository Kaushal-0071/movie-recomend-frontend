"use client";
import GenreSelector from "@/components/genreSelector";
import React, {  useContext, useEffect, useState } from "react";
import { GenreContext } from "../context/GenreContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/components/moviecard";

const HomePage = () => {
  const { Genre, setGenre } = useContext(GenreContext);

  const [GenreData, setGenreData] = useState({});
  const [loading, setLoading] = useState(false);
const router = useRouter(); // Import useRouter from next/router

  const fetchgenre = async () => {
  setLoading(true); // Set loading to true when fetching starts
    try {
       
      if (!Genre || Genre.length === 0) return; // Prevent running if Genre is empty

      const response = await fetch("http://127.0.0.1:5000/recommend_genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genres: Genre,
          see_top: 10,
        }),
      });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

      const data = await response.json();
      setGenreData(data);
      console.log("Received Data:", data);
      
    } catch (error) {
        
      console.error("Error fetching genre data:", error);
    }
    setLoading(false); // Set loading to false when fetching ends
  };
  function goToMoviePage(movieTitle) {
    const encodedTitle = encodeURIComponent(movieTitle); // Encode title for URL
    router.push(`/movie/${encodedTitle}`); // Navigate to /movie/[title]
  }
 
  useEffect(() => {
    console.log("Genres being sent:", Genre);
    fetchgenre(); // Run fetch when component mounts
  }, []); // Empty dependency array ensures it only runs on the first render


  return (
    <>
       <GenreSelector />
       <div className="flex justify-center items-center mt-4">

       <Button onClick={ fetchgenre}>Get recommendations</Button>
       </div>
      <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Movie Recommendations</h1>
      {GenreData.length > 0  && !loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GenreData.map((movie, index) => (

            <button onClick={()=>goToMoviePage(movie.title)} key={index}>
           <MovieCard movieName={movie.title} />
              </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
   
    </>
  );
};

export default HomePage;
