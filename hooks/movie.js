"use client"

import { useState, useEffect } from "react"



export function useMovieData(movieName) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieName) {
        setIsLoading(false)
        setError("Please provide a movie name")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const apiKey = "7afe56e3"
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`)

        if (!response.ok) {
          throw new Error("Failed to fetch movie data")
        }

        const movieData = await response.json()

        if (movieData.Response === "False") {
          setError(movieData.Error || "Movie not found")
          setData(null)
        } else {
          setData(movieData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieData()
  }, [movieName])

  return { data, isLoading, error }
}

