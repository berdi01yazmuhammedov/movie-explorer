import React from 'react'
import { Link } from 'react-router'
interface MovieCardProps {
    movie: {
        id: number;
        title: string;
        overview: string;
        poster_path: string;
    };
}
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  console.log(movie);
  
  return (
    <Link to={`/movie/${movie.id}`}
        key={movie.id}
        
        className="relative p-4 border rounded-xl w-[200px] h-[300px] hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden group"
      >
        <h3>{movie.title}</h3>
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
        />
        <h4 className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 max-h-[40%] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {movie.overview.slice(0, 100).trim().concat("...")}
        </h4>
      </Link>
  )
}

export default MovieCard