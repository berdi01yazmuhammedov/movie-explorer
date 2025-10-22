import Cast from '@/components/Cast';
import MovieVideos from '@/components/MovieVideos';
import RecommendedMovies from '@/components/RecommendedMovies';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCast, fetchMovieById, fetchMovieVideos, fetchRecommendedMovies } from '@/store/movieSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector((state) => state.movies.currentMovie);

    useEffect(() => {
        if (!movie || movie.id !== Number(id)) {
            dispatch(fetchMovieById({ id: Number(id) }));
            dispatch(fetchCast({id: Number(id)}));
            dispatch(fetchRecommendedMovies({id: Number(id)}))
            dispatch(fetchMovieVideos({id: Number(id)}))
        }
    }, [id, movie, dispatch]);

    if (!movie) return <div className="text-center p-10 text-lg">Loading...</div>;

    return (
        <div
            className="relative min-h-screen bg-cover bg-center text-white"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            }}
        >
            <div className="flex flex-col md:flex-row gap-8 p-8 max-w-5xl mx-auto">
                {/* Постер */}
                <div className="flex-shrink-0">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-2xl shadow-lg max-w-[300px]"
                    />
                </div>

                {/* Информация */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
                        {movie.overview}
                    </p>

                    <div className="flex flex-col flex-wrap gap-4 text-sm text-gray-300">
                        <span>📅 {movie.release_date}</span>
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>🗳 {movie.vote_count} голосов</span>
                        <span>🎭{movie.genres.map((genre) => genre.name).join(', ')}</span>
                        <span>🔥 Популярность: {Math.round(movie.popularity)}</span>
                        <span>🎬 Язык: {movie.original_language.toUpperCase()}</span>
                    </div>
                </div>
            </div>
            <Cast />
            <RecommendedMovies />
            <MovieVideos />
            {/* затемнение снизу для эстетики */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
            <h3 className="text-2xl font-semibold mb-4 mt-8 text-center">Production companies</h3>
            <div className="flex gap-4 items-center flex-wrap max-w-5xl mx-auto bg-zinc-400 p-4 rounded-lg shadow-md justify-center">
                <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.production_companies[0]?.logo_path}`}
                    alt=""
                />
                <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.production_companies[1]?.logo_path}`}
                    alt=""
                />
            </div>
        </div>
    );
};

export default MoviePage;
