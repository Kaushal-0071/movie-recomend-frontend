
"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { GenreContext } from "@/app/context/GenreContext"

export default function GenreSelector() {
  const allGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Western",
  ]

  const {Genre, setGenre} = useContext(GenreContext)
  const toggleGenre = (genre) => {
    if (Genre.includes(genre)) {
      // Remove genre if already selected
      setGenre(Genre.filter((g) => g !== genre))
    } else {
      // Add genre if not selected
      setGenre([...Genre, genre])
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Select Genres</h2>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => {
            const isSelected = Genre.includes(genre)
            return (
              <Button
                key={genre}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleGenre(genre)}
                className={isSelected ? "" : ""}
              >
                {genre}
              </Button>
            )
          })}
        </div>
      </div>

      
    </div>
  )
}

