import MovieCard from './components/MovieCard';
import { fetchMovies } from './store/slices/movies/thunk';
import {selectFilteredMovies} from "./store/slices/movies/selectors";
import {type Movie} from "./store/slices/movies/types";
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import Filters from './components/Filters';

function App() {
    const dispatch = useAppDispatch();
    const { query, isSearching, page, hasMore, loading, total_pages } = useAppSelector(
        (state) => state.movies
    );
    const movies = useAppSelector(selectFilteredMovies);

    useEffect(() => {
        if (!isSearching && !movies.length) {
            dispatch(fetchMovies({ query: '' }));
        }
    }, [dispatch, movies.length, isSearching]);

    const loadMore = () => {
        if (!loading && hasMore) {
            dispatch(fetchMovies({ query: '', page: page + 1 }));
        }
    };

    return (
        <div className="px-4 sm:px-6 py-10 min-h-screen flex flex-col items-center bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl items-start lg:items-stretch">
                <aside className="w-full sm:max-w-md lg:max-w-[260px] h-fit mx-auto lg:mx-0 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg transition-all">
                    <Filters />
                </aside>

                <main className="flex flex-wrap justify-center lg:justify-start gap-6 flex-1 w-full">
                    {loading && <div className="text-gray-500 dark:text-gray-400">Loading...</div>}

                    {!loading && movies.length === 0 && isSearching && (
                        <div className="py-10">
                            <p className="text-gray-500 dark:text-gray-400">
                                No results found for “{query}”
                            </p>
                            <p className='mt-4'>Try another movie name.</p>
                        </div>
                    )}

                    {movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </main>
            </div>

            {hasMore && (
                <div className="w-full flex justify-center mt-12">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm dark:shadow-indigo-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}

            {total_pages > 1 && (
                <div className="mt-10 flex gap-2 justify-center flex-wrap">
                    {Array.from({ length: total_pages }, (_, i) => i + 1)
                        .filter(
                            (pageNum) =>
                                pageNum === 1 ||
                                pageNum === total_pages ||
                                (pageNum >= page - 2 && pageNum <= page + 2)
                        )
                        .map((pageNum, index, array) => {
                            const prev = array[index - 1];
                            const showDots = prev && pageNum - prev > 1;

                            return (
                                <div key={pageNum} className="flex items-center">
                                    {showDots && (
                                        <span className="text-gray-400 dark:text-gray-500 px-2">
                                            ...
                                        </span>
                                    )}
                                    <button
                                        onClick={() =>
                                            dispatch(fetchMovies({ query: '', page: pageNum }))
                                        }
                                        className={`px-4 py-2 rounded-md border text-sm transition-all duration-200 ${
                                            page === pageNum
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border-zinc-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default App;
