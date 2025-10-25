import MovieCard from './components/MovieCard';
import { fetchMovies, selectFilteredMovies, type Movie } from './store/movieSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import Filters from './components/Filters';

function App() {
    const dispatch = useAppDispatch();
    const { page, hasMore, loading, total_pages } = useAppSelector((state) => state.movies);
    const movies = useAppSelector(selectFilteredMovies);

    useEffect(() => {
        if (!movies.length) {
            dispatch(fetchMovies({ query: '' }));
        }
    }, [dispatch, movies.length]);

    const loadMore = () => {
        if (!loading && hasMore) {
            dispatch(fetchMovies({ query: '', page: page + 1 }));
        }
    };

    return (
        <div className="px-6 py-10 min-h-screen flex flex-col items-center">
            <div className="flex gap-8 items-start w-full max-w-7xl">
                <aside className="w-[240px] shrink-0 bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg">
                    <Filters />
                </aside>

                <main className="flex flex-wrap justify-start gap-6 flex-1">
                    {loading && <div className="text-gray-400">Loading...</div>}
                    {movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </main>
            </div>

            {hasMore && (
                <div className="w-full flex justify-center mt-10">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-indigo-500/30 transition-all duration-300"
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
                                    {showDots && <span className="text-gray-500 px-2">...</span>}
                                    <button
                                        onClick={() =>
                                            dispatch(fetchMovies({ query: '', page: pageNum }))
                                        }
                                        className={`px-4 py-2 rounded-md border text-sm transition-all ${
                                            page === pageNum
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-zinc-900 text-gray-300 border-zinc-700 hover:bg-zinc-800'
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
