import {
  useEffect,
  useState,
} from "react";

import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdb";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search, 500);

  useEffect(() => {
    async function fetchMovies() {
      let data;

      if (debouncedSearch.trim()) {
        data = await searchMovies(
          debouncedSearch
        );
      } else {
        data = await getPopularMovies();
      }

      setMovies(data.results);
    }

    fetchMovies();
  }, [debouncedSearch]);

  return (
    <div className="home">
      <h1>🎬 Netflix Lite</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <MovieGrid movies={movies} />
    </div>
  );
}

export default Home;