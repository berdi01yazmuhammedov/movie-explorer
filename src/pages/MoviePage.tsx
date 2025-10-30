import Cast from '@/components/Cast';
import MovieVideos from '@/components/MovieVideos';
import RecommendedMovies from '@/components/RecommendedMovies';
import { toggleFavoriteMovie } from '@/store/slices/favoritesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    fetchCast,
    fetchMovieById,
    fetchMovieVideos,
    fetchRecommendedMovies,
} from '@/store/slices/movies/thunk';
import { type Movie } from '@/store/slices/movies/types';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import MovieDetails from '@/components/MovieDetails';
import { formatMovieForFavorites } from '@/store/utils/formatMovieForFavorites';

const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector((state) => state.movies.currentMovie);

    const isFavorite = useAppSelector((state) =>
        state.favorites.favoriteMovies.some((fav) => fav.id === movie?.id)
    );

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

    const onClickFavoriteMovie = () => {
        if (!movie) return;

        dispatch(toggleFavoriteMovie(formatMovieForFavorites(movie)));
    };

    return (
        <div className="relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <MovieDetails
                movie={movie}
                isFavorite={isFavorite}
                onClickFavoriteMovie={onClickFavoriteMovie}
            />
            <div className="relative z-10 mt-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
                <Cast />
                <RecommendedMovies />
                <MovieVideos />
            </div>
        </div>
    );
};

export default MoviePage;
