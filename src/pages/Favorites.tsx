import React from "react";
import { useAppSelector } from "@/store/hooks";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/store/movieSlice";

const Favorites = () => {
  const movies = useAppSelector((state) => state.favorites.items);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 text-lg">
        <p>No favorite movies yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-8 text-center text-gray-100 tracking-wide">
        Your Favorites
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
