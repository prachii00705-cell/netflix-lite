import { useEffect, useState } from "react";

import {
  getPopularMovies,
  searchMovies,
} from "../services/tmdb";

import { getMovieFromMood } from "../services/openrouter";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import MoodSearch from "../components/MoodSearch";
import BackToTop from "../components/BackToTop";

import useDebounce from "../hooks/useDebounce";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const debouncedSearch =
    useDebounce(search, 500);

  const featuredMovie = movies[0];

  const lastMovieRef =
    useInfiniteScroll(() => {
      if (!loading) {
        setPage((prev) => prev + 1);
      }
    });

  async function handleMoodSearch(
    mood
  ) {
    try {
      setLoading(true);

      const movieTitle =
        await getMovieFromMood(mood);

      setSearch(movieTitle);

      setPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      try {
        let data;

        if (debouncedSearch.trim()) {
          data = await searchMovies(
            debouncedSearch,
            page
          );
        } else {
          data =
            await getPopularMovies(page);
        }

        setMovies((prev) =>
          page === 1
            ? data.results
            : [
                ...prev,
                ...data.results,
              ]
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedSearch, page]);

  return (
    <div className="home">

      {featuredMovie && (
        <section
          className="hero"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,.55),
            rgba(0,0,0,.9)),
            url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})
            `,
          }}
        >
          <div className="hero-overlay">

            <h1>
              {featuredMovie.title}
            </h1>

            <div className="hero-meta">
              <span>
                ⭐{" "}
                {featuredMovie.vote_average.toFixed(
                  1
                )}
              </span>

              <span>
                📅{" "}
                {featuredMovie.release_date?.slice(
                  0,
                  4
                )}
              </span>

              <span>
                🎬 Movie
              </span>
            </div>

            <p>
              {featuredMovie.overview}
            </p>

            <button className="watch-btn">
              🎬 Watch Trailer
            </button>

          </div>
        </section>
      )}

      <SearchBar
        search={search}
        setSearch={(value) => {
            setSearch(value);
            setPage(1);
        }}
        />

      <MoodSearch
        onMoodSearch={
          handleMoodSearch
        }
      />

      <MovieGrid
        movies={movies}
        lastMovieRef={lastMovieRef}
      />

      {loading && (
        <h2
          style={{
            textAlign: "center",
            margin: "30px",
          }}
        >
          Loading...
        </h2>
      )}

      <BackToTop />

    </div>
  );
}

export default Home;