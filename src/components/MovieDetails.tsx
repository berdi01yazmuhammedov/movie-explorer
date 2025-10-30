import type { CurrentMovie } from '@/store/slices/movies/types';
import React from 'react';
interface MovieDetailsProps {
    movie: CurrentMovie;
    isFavorite: boolean;
    onClickFavoriteMovie: () => void;
}
const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, isFavorite, onClickFavoriteMovie }) => {
    return (
        <div className="relative w-full min-h-[80vh] flex items-center">
            <button
                onClick={onClickFavoriteMovie}
                className={`absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-medium transition-colors z-20 ${
                    isFavorite
                        ? 'bg-red-500 hover:bg-red-700 text-white'
                        : 'bg-zinc-700 hover:bg-zinc-600 text-gray-200'
                }`}
            >
                {isFavorite ? '★ In Favorites' : '☆ Add to Favorites'}
            </button>

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
                        <span>🎭 {movie.genres.map((genre) => genre.name).join(', ')}</span>
                        <span>🔥 Популярность: {Math.round(movie.popularity)}</span>
                        <span>🎬 Язык: {movie.original_language.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
