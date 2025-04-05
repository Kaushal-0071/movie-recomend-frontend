"use client"


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Clock, Calendar, Film, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useMovieData } from "@/hooks/movie"

export function MovieCard({ movieName, className = "" }) {
  const { data, isLoading, error } = useMovieData(movieName)

  if (error) {
    return (
      <Card className={`w-full max-w-md mx-auto overflow-hidden ${className}`}>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-destructive font-medium">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full max-w-md mx-auto overflow-hidden ${className}`}>
      {isLoading ? (
        <LoadingState />
      ) : (
        data && (
          <>
            <div className="relative w-full aspect-[2/3] max-h-[400px]">
              {data.Poster && data.Poster !== "N/A" ? (
                <Image
                  src={data.Poster || "/globe.svg"}
                  alt={`${data.Title} poster`}
                  fill
                  className="object-cover  "
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <Film className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl md:text-2xl">{data.Title}</CardTitle>
                  <CardDescription>
                    {data.Year} • {data.Rated}
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{data.imdbRating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-2">
              <p className="text-sm text-muted-foreground line-clamp-3">{data.Plot}</p>
              <div className="flex flex-wrap gap-2">
                {data.Genre.split(", ").map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{data.Runtime}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{data.Released}</span>
              </div>
            </CardFooter>
          </>
        )
      )}
    </Card>
  )
}

function LoadingState() {
  return (
    <>
      <div className="w-full aspect-[2/3] max-h-[400px] bg-muted" />
      <CardHeader className="pb-2 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-full" />
      </CardFooter>
    </>
  )
}

