import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovies, setQuery, setSearchValue } from '@/store/movieSlice';
import { Link, useNavigate } from 'react-router';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { searchValue } = useAppSelector((state) => state.movies);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.target.value));
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setQuery(searchValue));
        dispatch(fetchMovies({ query: searchValue }));
        navigate("/")
    };

    return (
        <header className="flex flex-col md:flex-row gap-4 md:gap-6 items-center px-4 py-6 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                        Movies
                    </h1>
                </Link>
                <ThemeToggle />
            </div>

            <form
                onSubmit={onFormSubmit}
                className="flex flex-1 items-center justify-center gap-2 p-2 md:p-4 w-full"
            >
                <Input
                    className="w-full max-w-2xl bg-zinc-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-200 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
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

            <Link
                to="/favorites"
                className="text-gray-900 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
            >
                Favorites
            </Link>
        </header>
    );
};

export default Header;
