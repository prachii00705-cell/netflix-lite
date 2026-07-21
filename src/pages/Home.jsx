import { useEffect, useState } from "react";

import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdb";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const lastMovieRef = useInfiniteScroll(() => {
    if (!loading) {
      setPage((prev) => prev + 1);
    }
  });

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      let data;

      if (debouncedSearch.trim()) {
        data = await searchMovies(
          debouncedSearch,
          page
        );
      } else {
        data = await getPopularMovies(page);
      }

      setMovies((prev) =>
        page === 1
          ? data.results
          : [...prev, ...data.results]
      );

      setLoading(false);
    }

    fetchMovies();
  }, [debouncedSearch, page]);

  // Reset to first page whenever search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <div className="home">
      <h1>🎬 Netflix Lite</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <MovieGrid
        movies={movies}
        lastMovieRef={lastMovieRef}
      />
    </div>
  );
}

export default Home;