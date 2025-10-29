import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovies, setQuery, setSearchValue } from '@/store/movieSlice';
import { Link, useNavigate } from 'react-router';
import { ThemeToggle } from './ThemeToggle';
import { Menu } from 'lucide-react';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { searchValue } = useAppSelector((state) => state.movies);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.target.value));
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setQuery(searchValue));
        dispatch(fetchMovies({ query: searchValue }));
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-zinc-100 dark:bg-zinc-900 shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                    <Link to="/" onClick={() => setIsMobileOpen(false)}>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            Movies
                        </h1>
                    </Link>
                </div>

                <form
                    onSubmit={onFormSubmit}
                    className="hidden md:flex items-center gap-2 flex-1 justify-center max-w-md"
                >
                    <Input
                        className="flex-1 bg-zinc-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-200 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                        name="search"
                        onChange={onSearchChange}
                        value={searchValue}
                        placeholder="Search movie..."
                    />
                    <Button
                        variant="outline"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 transition-colors duration-300"
                        type="submit"
                    >
                        Search
                    </Button>
                </form>

                <div className="flex items-center gap-3">
                    <Link
                        to="/favoritemovies"
                        className="text-gray-900 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                        Favorite Movies
                    </Link>
                    <Link
                        to="/favoriteactors"
                        className="text-gray-900 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                        Favorite Actors
                    </Link>
                    <ThemeToggle />
                    <button
                        className="md:hidden text-gray-900 dark:text-gray-200"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {isMobileOpen && (
                <div className="md:hidden px-4 pb-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    <form onSubmit={onFormSubmit} className="flex gap-2 mt-3">
                        <Input
                            className="flex-1 bg-zinc-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-200 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                            name="search"
                            onChange={onSearchChange}
                            value={searchValue}
                            placeholder="Search movie..."
                        />
                        <Button
                            variant="outline"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 transition-colors duration-300"
                            type="submit"
                        >
                            Go
                        </Button>
                    </form>
                </div>
            )}
        </header>
    );
};

export default Header;
