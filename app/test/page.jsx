"use client";

import React, { useEffect, useState } from "react";
import { Rating } from "primereact/rating";

const MovieRating = () => {
  const movieName = "Inception"; // Change this to dynamically set different movies
  const storageKey = `rating_${movieName}`;
  const [value, setValue] = useState(0);

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

  return (
    <div>
      <h3>Rate {movieName}</h3>
      <Rating
        value={value}
        onChange={(e) => {
          setValue(e.value);
          likeIfHighRating(movieName, e.value);
        }}
        cancel={false}
      />
      <p>Your rating: {value}</p>
    </div>
  );
};

export default MovieRating;
