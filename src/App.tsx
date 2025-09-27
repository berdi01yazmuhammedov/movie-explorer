import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import MovieCard from "./components/MovieCard";
import {
  fetchMovies,
  selectFilteredMovies,
  setQuery,
  setSearchValue,
  type Movie,
} from "./store/movieSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import { useEffect } from "react";
import Filters from "./components/Filters";

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
      dispatch(fetchMovies({ query: "" }));
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
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <form onSubmit={onFormSubmit} className="flex relative">
          <Input
            className="text-black"
            name="search"
            onChange={onSearchChange}
            value={searchValue}
            placeholder="Search movie..."
          />
          <Button
            variant={"outline"}
            className="absolute right-0"
            type="submit"
          >
            Search
          </Button>
        </form>
        <div className="flex gap-4 mt-14">
          <aside className="w-1/5">
            <Filters />
          </aside>

          <main className="w-4/5 p-4 flex flex-wrap justify-center gap-4">
            {loading && <div>Loading...</div>}
            {searchedMovies}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
