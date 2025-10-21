import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovies, setQuery, setSearchValue } from '@/store/movieSlice';
import { Link } from 'react-router';

const Header = () => {
    const dispatch = useAppDispatch();
    const { searchValue } = useAppSelector((state) => state.movies);
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.target.value));
    };
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setQuery(searchValue));
        dispatch(fetchMovies({ query: searchValue }));
    };
    return (
        <header className="flex gap-4 p-4 items-center">
            <Link to="/">
                <h1 className="text-3xl font-bold text-center">Movies</h1>
            </Link>
            <form
                onSubmit={onFormSubmit}
                className="flex flex-1 items-center justify-center gap-2 p-4"
            >
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
        </header>
    );
};

export default Header;
