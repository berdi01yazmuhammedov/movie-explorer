import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Link } from "react-router";
import MovieCard from "./components/MovieCard";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        options
      );
      const data = await res.json();
      setResult(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!query) return;
    getData();
  }, [query]);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchValue);
  };

  const searchedMovies = result.map((movie: Movie) => {
    //  const backdrop_path = <img
    //     className="w-full"
    //       src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
    //       alt={movie.backdrop_path}
    //     />
    return (
      <MovieCard key={movie.id} movie={movie}/>
    );
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

        <div className="p-4 flex flex-wrap justify-center gap-4">
          {searchedMovies}
        </div>
      </div>
    </>
  );
}

export default App;
