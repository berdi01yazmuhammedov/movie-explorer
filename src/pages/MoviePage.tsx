import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovieById } from '@/store/movieSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector((state) => state.movies.currentMovie);

    useEffect(() => {
        if (!movie || movie.id !== Number(id)) {
            dispatch(fetchMovieById({ id: Number(id) }));
        }
    }, [id, movie, dispatch]);
    return (
        <div>
            MoviePage {id} {movie?.original_title}
        </div>
    );
};

export default MoviePage;
