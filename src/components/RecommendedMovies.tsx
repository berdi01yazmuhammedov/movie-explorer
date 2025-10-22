import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router';

const RecommendedMovies = () => {
    const recommendedMovies = useAppSelector((state) => state.movies.recommendedMovies);

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-100 tracking-wide">
                Recommended Movies
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
                {recommendedMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`}
                        
                        key={movie.id}
                        className="w-40 sm:w-48 md:w-56 flex flex-col items-center text-center bg-zinc-900/40 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <img
                            className="w-full h-60 object-cover rounded-t-xl"
                            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3 className="p-3 text-sm sm:text-base text-gray-200 font-medium truncate w-full">
                            {movie.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecommendedMovies;
