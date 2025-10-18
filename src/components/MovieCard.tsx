import React from 'react';
import { Link } from 'react-router';
interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        overview: string;
        poster_path: string;
    };
}
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="group relative rounded-xl overflow-hidden w-[220px] h-[330px] bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-indigo-500/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
        >
            <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white drop-shadow-md truncate">
                {movie.title}
            </h3>
            <p className="absolute bottom-0 left-0 right-0 bg-black/80 text-gray-200 text-xs p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {movie.overview.slice(0, 100).trim().concat('...')}
            </p>
        </Link>
    );
};

export default MovieCard;
