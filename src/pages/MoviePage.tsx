import Cast from "@/components/Cast";
import MovieVideos from "@/components/MovieVideos";
import RecommendedMovies from "@/components/RecommendedMovies";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCast,
  fetchMovieById,
  fetchMovieVideos,
  fetchRecommendedMovies,
} from "@/store/movieSlice";
import { useEffect } from "react";
import { useParams } from "react-router";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.currentMovie);

  useEffect(() => {
    if (!movie || movie.id !== Number(id)) {
      dispatch(fetchMovieById({ id: Number(id) }));
      dispatch(fetchCast({ id: Number(id) }));
      dispatch(fetchRecommendedMovies({ id: Number(id) }));
      dispatch(fetchMovieVideos({ id: Number(id) }));
    }
  }, [id, movie, dispatch]);

  if (!movie)
    return (
      <div className="text-center p-10 text-lg text-gray-900 dark:text-white transition-colors duration-300">
        Loading...
      </div>
    );

  return (
    <div className="relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative w-full min-h-[80vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/70 z-0" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 px-4 sm:px-6 py-10">
          <div className="w-full max-w-[300px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[320px] mx-auto md:mx-0 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-2xl shadow-lg dark:shadow-black/50 w-full object-cover transition-all"
            />
          </div>

          <div className="flex flex-col justify-center gap-4 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {movie.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-200 dark:text-gray-300 leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex flex-col gap-1 text-sm sm:text-base text-gray-200 dark:text-gray-300">
              <span>📅 {movie.release_date}</span>
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>🗳 {movie.vote_count} голосов</span>
              <span>🎭 {movie.genres.map((genre) => genre.name).join(", ")}</span>
              <span>🔥 Популярность: {Math.round(movie.popularity)}</span>
              <span>🎬 Язык: {movie.original_language.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        <Cast />
        <RecommendedMovies />
        <MovieVideos />
      </div>

      <div className="relative z-10 mt-16 max-w-6xl mx-auto p-4 sm:p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white transition-colors duration-300">
          Production Companies
        </h3>
        {movie.production_companies.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No production companies found.
          </p>
        ) : (
          <div className="flex gap-4 flex-wrap justify-center bg-white/20 dark:bg-gray-900/50 p-4 rounded-lg shadow-md dark:shadow-black/50 transition-colors duration-300">
            {movie.production_companies.map(
              (company) =>
                company.logo_path && (
                  <img
                    key={company.id}
                    src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`}
                    alt={company.name}
                    className="max-h-12 sm:max-h-16 object-contain"
                  />
                )
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 dark:from-black/90 pointer-events-none z-0"></div>
    </div>
  );
};

export default MoviePage;
