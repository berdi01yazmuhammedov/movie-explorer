import MovieCard from './components/MovieCard';
import { fetchMovies, selectFilteredMovies, type Movie } from './store/movieSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

import { useEffect } from 'react';
import Filters from './components/Filters';

function App() {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.movies);
    const movies = useAppSelector(selectFilteredMovies);

    useEffect(() => {
        if (!movies.length) {
            dispatch(fetchMovies({ query: '' }));
        }
    }, [dispatch, movies.length]);
    const searchedMovies = movies.map((movie: Movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
    });

    return (
        <div className="px-8 py-10">
            <div className="flex gap-8 items-start">
                <aside className="w-[240px] shrink-0 bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg">
                    <Filters />
                </aside>

                <main className="flex flex-wrap justify-start gap-6 flex-1">
                    {loading && <div>Loading...</div>}
                    {searchedMovies}
                </main>
            </div>
        </div>
    );
}

export default App;
