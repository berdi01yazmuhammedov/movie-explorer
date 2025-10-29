import React, { useState } from 'react';
import { Input } from './ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMovies, setQuery, setSearchValue } from '@/store/movieSlice';
import { Link, useNavigate } from 'react-router';
import { ThemeToggle } from './ThemeToggle';
import { Search, X, XCircle } from 'lucide-react';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchValue } = useAppSelector((state) => state.movies);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const onClear = () => {
    dispatch(setSearchValue(''));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    dispatch(setQuery(searchValue));
    dispatch(fetchMovies({ query: searchValue }));
    navigate('/');
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-100 dark:bg-zinc-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300"
            >
              Movies
            </Link>

            <nav className="flex items-center gap-3 text-sm md:text-base">
              <Link
                to="/favoritemovies"
                className="text-gray-900 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Favorite Movies
              </Link>
              <Link
                to="/favoriteactors"
                className="text-gray-900 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Favorite Actors
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              aria-label="Toggle search"
              className="text-gray-900 dark:text-gray-200 transition-colors"
            >
              {isMobileSearchOpen ? <X size={22} /> : <Search size={22} />}
            </button>
          </div>
        </div>

        <form
          onSubmit={onFormSubmit}
          className={`relative flex items-center gap-2 w-full sm:w-auto transition-all duration-300 ${
            isMobileSearchOpen
              ? 'max-h-20 mt-2 opacity-100'
              : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100 sm:mt-0'
          } overflow-hidden sm:flex sm:opacity-100`}
        >
          <div className="relative w-full sm:w-64">
            <Input
              className="w-full bg-zinc-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-200 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 pr-8"
              name="search"
              onChange={onSearchChange}
              value={searchValue}
              placeholder="Search movie..."
            />

            {searchValue && (
              <button
                type="button"
                onClick={onClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </form>

        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
