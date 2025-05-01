"use client";
import React, { useState } from "react";
import { GenreContext } from "./context/GenreContext";
import { LikedMoviesContext } from "./context/LikedMoviesContext";
import { UseridContext } from "./context/Useridcontex";
import { PrimeReactProvider } from 'primereact/api';
const Provider = ({ children }) => {
    const [Userid, setUserid] = useState(1);
    const [LikedMovies, setLikedMovies] = useState([]);
    const [Genre, setGenre] = useState([]);
  return (
    <PrimeReactProvider>

    <UseridContext.Provider value={{Userid, setUserid}}>
      <LikedMoviesContext.Provider value={{LikedMovies, setLikedMovies}}>
        <GenreContext.Provider value={{Genre, setGenre}}>
          
          {children}
        </GenreContext.Provider>
      </LikedMoviesContext.Provider>
    </UseridContext.Provider>
    </PrimeReactProvider>
  );
};

export default Provider;
