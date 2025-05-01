import React from "react";

const RecommendationUI = ({ recommendation }) => {
  if (!recommendation) return <p>No recommendations available.</p>;

  const { recommended_movie, recommendation_reason, similar_movies } = recommendation;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Recommended Movie</h2>
      <div className="border p-4 rounded-lg mt-2">
        <h3 className="text-lg font-semibold">{recommended_movie.title}</h3>
        
        <p><strong>Genre:</strong> {recommended_movie.genres}</p>
        <p><strong>Release Year:</strong> {recommended_movie.release_date}</p>
       
        <p className="mt-2 text-gray-600">{recommendation_reason}</p>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-6">Similar Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {similar_movies.map((movie, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p><strong>language:</strong> {movie.original_language}</p>
            <p><strong>Genre:</strong> {movie.genres}</p>
            <p><strong>Release Year:</strong> {movie.release_date}</p>
            <p className="text-sm text-gray-600">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationUI;
