import React from 'react';
import { Link } from 'react-router';
import HeartSVG from '../assets/heart.svg';
import unCheckedHeartSVG from '../assets/uncheckedHeart.svg';
import { toggleFavoriteMovie } from '@/store/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Movie } from '@/store/movieSlice';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favoriteMovies);
    const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

    const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(toggleFavoriteMovie(movie));
    };

    return (
        <Link
            to={`/movie/${movie.id}`}
            className="group relative rounded-xl overflow-hidden w-[220px] h-[330px] bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-md hover:shadow-indigo-500/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
        >
            <button
                onClick={onClickFavorite}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
                backdrop-blur-md border transition-all duration-200
                ${
                    isFavorite
                        ? 'bg-red-200/30 dark:bg-red-500/20 border-red-300 shadow-lg shadow-red-500/30 hover:bg-red-500 dark:hover:bg-red-600'
                        : 'bg-zinc-800/70 dark:bg-zinc-200/30 border-zinc-700 dark:border-zinc-500 hover:bg-zinc-700/80 dark:hover:bg-zinc-400/50'
                }`}
            >
                <img
                    src={isFavorite ? HeartSVG : unCheckedHeartSVG}
                    alt="favorite"
                    className={`w-4 h-4 ${
                        isFavorite ? 'brightness-110' : 'opacity-80'
                    } transition-all`}
                />
            </button>

            <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <h3 className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-gray-100 dark:text-white drop-shadow-md truncate transition-colors duration-300">
                {movie.title}
            </h3>

            <p className="absolute bottom-0 left-0 right-0 bg-black/80 dark:bg-zinc-900/80 text-gray-100 dark:text-gray-200 text-xs p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {movie.overview.slice(0, 100).trim().concat('...')}
            </p>
        </Link>
    );
};

export default MovieCard;
