import type { CurrentMovie, Movie } from "@/store/slices/movies/types";

export const formatMovieForFavorites = (movie: CurrentMovie): Movie => ({
  ...movie,
  poster_path: movie.poster_path ?? "",
  backdrop_path: movie.backdrop_path ?? "",
  genre_ids: movie.genres.map((g) => g.id),
});
