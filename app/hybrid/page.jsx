"use client"
import React, { use, useContext, useEffect, useState } from 'react'
import { LikedMoviesContext } from '../context/LikedMoviesContext';
import { UseridContext } from '../context/Useridcontex';
import { useRouter } from 'next/navigation';
import { MovieCard } from '@/components/moviecard';

const Hybrid = () => {
  const {LikedMovies, setLikedMovies} = useContext(LikedMoviesContext);
const {Userid, setUserid}=useContext(UseridContext)
const [loading, setLoading] = useState(true);
const [moviesRecomended, setmoviesRecomended] = useState([]);
const router = useRouter(); // Import useRouter from next/router

useEffect(() => {
  const storedLikedMovies = localStorage.getItem("likedMovies");
  if (storedLikedMovies) {
    setLikedMovies(JSON.parse(storedLikedMovies));
  }
  console.log("Liked Movies from localStorage:", LikedMovies); // Log liked movies
}, []);


// State to hold recommended movies
  const fetchUserRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/user_recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: Userid,
          movies: LikedMovies,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("User Recommendations:", data);
      const movieTitles = data.map(movie => movie.title);
      setmoviesRecomended(prevMovies => [...prevMovies, ...movieTitles]);
       // Returns recommended movies
    } catch (error) {
      console.error("Error fetching user recommendations:", error);
      setmoviesRecomended([...moviesRecomended,...[]]); // Set to empty array on error
    }
    finally {
      setLoading(false); // Stop loading
    }
  };
  



  const fetchContentBased = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch("http://127.0.0.1:5000/content-based", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movies: LikedMovies }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("contenr based Movies:", data.recommended_movies);
    
      setmoviesRecomended(prevMovies => [...prevMovies, ...data.recommended_movies]);

    } catch (error) {
      console.error("Error fetching content-based recommendations:", error);
      setmoviesRecomended([...moviesRecomended,[]]); // Set to empty array on error
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    if (LikedMovies.length > 0 ) {
      console.log("Liked Movies:", LikedMovies);
      console.log("User ID:", Userid);
      fetchUserRecommendations();
      fetchContentBased();
     
    }
  }, [LikedMovies, Userid]);
useEffect(() => {console.log("hybrid:", moviesRecomended);},[moviesRecomended]); // Log liked movies whenever they change


function goToMoviePage(movieTitle) {
  const encodedTitle = encodeURIComponent(movieTitle); // Encode title for URL
  router.push(`/movie/${encodedTitle}`); // Navigate to /movie/[title]
}
  return (
<>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Recommended Movies</h2>


      {loading ? (
        <p className="text-gray-500">Fetching recommendations...</p>
      ) : moviesRecomended.length === 0 ? (
        <p className="text-gray-500">No recommendations available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {[...new Set(moviesRecomended)].map((movie, index) => (
  <button onClick={() => goToMoviePage(movie)} key={index} className='cursor-pointer hover:scale-110 transition-all'>
    <MovieCard movieName={movie} />
  </button>
))}

        </div>
      )}

    </div>
    </>



  )
}

export default Hybrid