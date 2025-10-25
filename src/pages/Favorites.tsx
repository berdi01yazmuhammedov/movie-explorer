import { useAppSelector } from "@/store/hooks";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/store/movieSlice";

const Favorites = () => {
  const movies = useAppSelector((state) => state.favorites.items);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500 dark:text-gray-400 text-lg">
        <p>No favorite movies yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 transition-colors duration-500 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-zinc-900 dark:text-gray-100 tracking-wide">
        Your Favorites
      </h2>

      <div className="flex flex-wrap justify-center sm:justify-start gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
