import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import MovieCard from './components/MovieCard';
import {
    fetchMovies,
    selectFilteredMovies,
    setQuery,
    setSearchValue,
    type Movie,
} from './store/movieSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

import { useEffect } from 'react';
import Filters from './components/Filters';
import Header from './components/Header';

function App() {
    const dispatch = useAppDispatch();
    const { searchValue, loading } = useAppSelector((state) => state.movies);
    const movies = useAppSelector(selectFilteredMovies);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.target.value));
    };
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setQuery(searchValue));
        dispatch(fetchMovies({ query: searchValue }));
    };
    useEffect(() => {
        if (!movies.length) {
            dispatch(fetchMovies({ query: '' }));
        }
    }, [dispatch, movies.length]);
    const searchedMovies = movies.map((movie: Movie) => {
        //  const backdrop_path = <img
        //     className="w-full"
        //       src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        //       alt={movie.backdrop_path}
        //     />
        return <MovieCard key={movie.id} movie={movie} />;
    });

    return (
        <div className="px-8 py-10">
            
            <form onSubmit={onFormSubmit} className="flex items-center justify-center gap-2 mb-10">
                <Input
                    className="w-full max-w-2xl bg-zinc-800 text-gray-200 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    name="search"
                    onChange={onSearchChange}
                    value={searchValue}
                    placeholder="Search movie..."
                />
                <Button
                    variant="outline"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6"
                    type="submit"
                >
                    Search
                </Button>
            </form>

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
