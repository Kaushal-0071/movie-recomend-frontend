"use client"
import React, { useContext, useEffect } from 'react'
import { LikedMoviesContext } from '../context/LikedMoviesContext';
import { MovieCard } from '@/components/moviecard';
import { useRouter } from 'next/navigation';

const Likespage = () => {
     const {LikedMovies, setLikedMovies} = useContext(LikedMoviesContext); 
   
   const router = useRouter(); // Import useRouter from next/router
   
    useEffect(() => {
      const storedLikedMovies = localStorage.getItem("likedMovies");
      if (storedLikedMovies) {
        setLikedMovies(JSON.parse(storedLikedMovies));
      }
      console.log("Liked Movies from localStorage:", LikedMovies); // Log liked movies
    }, []);

    useEffect(() => {
        console.log("Liked Movies updated:", LikedMovies);
      }, [LikedMovies]);
      
      function goToMoviePage(movieTitle) {
        const encodedTitle = encodeURIComponent(movieTitle); // Encode title for URL
        router.push(`/movie/${encodedTitle}`); // Navigate to /movie/[title]
      }
    

  return (
    <div>

{LikedMovies.length > 0 ? (
        LikedMovies.map((movie, index) => (
            <button onClick={() => goToMoviePage(movie)} key={index}>
          <div key={index} className='grid grid-cols-2 gap-4 p-4 '>
            <MovieCard movieName={movie} className='w-50 h-110 hover:scale-105 transition-all cursor-pointer' />
          </div>
          </button>
        ))
      ) : (
        <div className='text-center p-5 font-bold text-3xl'>No liked movies</div>
      )}
    </div>
      
  )
}

export default Likespage