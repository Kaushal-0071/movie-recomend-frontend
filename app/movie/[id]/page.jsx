"use client";

import { LikedMoviesContext } from "@/app/context/LikedMoviesContext";
import { MovieCard } from "@/components/moviecard";

import { useParams, useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rating } from "primereact/rating";

import { Heart, Film, Loader2, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UseridContext } from "@/app/context/Useridcontex";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  const {Userid, setUserid}  =useContext(UseridContext);
  useEffect(() => {
    const storedUserid = localStorage.getItem("Userid");
    if (storedUserid) {
      setUserid(storedUserid);
    }
  }, []);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get movie title from URL
  const {LikedMovies, setLikedMovies} = useContext(LikedMoviesContext); // Import LikedMoviesContext  
  const decodedTitle = decodeURIComponent(id); // Decode the title
const [value, setValue] = useState(0);

  // Load rating from localStorage on mount
   // Load rating from localStorage on mount
   useEffect(() => {
     const storedRating = localStorage.getItem(`rating_${decodedTitle}`);
     if (storedRating) {
       setValue(parseInt(storedRating));
     }
   }, []);
 
   // Store rating to localStorage when value changes
   useEffect(() => {
     if (value !== 0) {
       localStorage.setItem(`rating_${decodedTitle}`, value.toString());
     }
   }, [value]);

  useEffect(() => {
    if (LikedMovies.length > 0) {
      localStorage.setItem("likedMovies", JSON.stringify(LikedMovies));
    }else{
      localStorage.setItem("likedMovies", JSON.stringify([]));
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


  async function submitRating(userId, title, rating, display = 10) {
    try {
      const response = await fetch("http://localhost:5000/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          title,
          rating,
          display
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit rating");
      }
  
    
      
  
    } catch (err) {
      console.error("❌ Error submitting rating:", err.message);
      return [];
    }
  }
  
useEffect(() => {
  console.log("Liked Movies:", LikedMovies);  },[LikedMovies]); // Log liked movies whenever they change

  // const setlikes=(movie) => {
  //   if(LikedMovies.includes(movie)) {
  //    setLikedMovies(LikedMovies.filter((m) => m !== movie)); // Remove the movie if already liked
  //   }else{
  //     setLikedMovies([...LikedMovies, movie]); // Add the new movie to the liked movies
  //   }
  //    // Log the liked movies

  // }
  const likeIfHighRating = (movie, rating) => {
    submitRating(Userid, movie, rating); // Call the function to submit the rating
    if (rating > 4 && !LikedMovies.includes(movie)) {
      setLikedMovies([...LikedMovies, movie]);
    } else if (rating <= 4 && LikedMovies.includes(movie)) {
      setLikedMovies(LikedMovies.filter((m) => m !== movie));
    }
  };
  
  function goToMoviePage(movieTitle) {
    const encodedTitle = encodeURIComponent(movieTitle); // Encode title for URL
    router.push(`/movie/${encodedTitle}`); // Navigate to /movie/[title]
  }

  return (
    
   <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr,200px] grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-6 ">
            <MovieCard 
              movieName={decodedTitle} 
              className="w-full max-w-none shadow-xl" 
            />
            
            <div className="flex justify-center">
               <Rating
                      value={value}
                      onChange={(e) => {
                        setValue(e.value);
                        likeIfHighRating(decodedTitle, e.value);
                      }}
                      cancel={false}
                    />
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <Card className="h-fit ">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Recommendations</h2>
                </div>
                {loading && (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                )}
              </div>
            </div>

            <ScrollArea className="h-[600px]">
              {loading ? (
                <div className="p-6 text-center text-muted-foreground">
                  Finding similar movies...
                </div>
              ) : movies.length > 0 ? (
                <div className="p-2">
                  {movies.map((movie, index) => (
                    <div key={index} className="relative">
                      <Button
                        variant="ghost"
                        className="w-full px-4 py-3 h-auto justify-start text-left rounded-lg hover:bg-accent group"
                        onClick={() => goToMoviePage(movie)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-16 bg-muted rounded flex items-center justify-center">
                            <Film className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-1">{movie}</p>
                            <p className="text-sm text-muted-foreground">Click to view details</p>
                          </div>
                        </div>
                      </Button>
                      {index !== movies.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  No recommendations available at the moment.
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Movie;
