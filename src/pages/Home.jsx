import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/tmdb";
import MovieGrid from "../components/MovieGrid";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies();
      setMovies(data.results);
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>

      <MovieGrid movies={movies} />
    </div>
  );
}

export default Home;