import { useContext } from "react";
import { IMAGE_BASE_URL } from "../utils/constants";
import { FavoritesContext } from "../context/FavoritesContext";

function MovieCard({ movie }) {
  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  return (
    <div className="movie-card">

      <div className="poster-container">

        <img
          loading="lazy"
          src={
            movie.poster_path
              ? IMAGE_BASE_URL +
                movie.poster_path
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
        />

        <span className="rating">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>

        <button
          className="fav-btn"
          onClick={() =>
            toggleFavorite(movie)
          }
        >
          {isFavorite(movie.id)
            ? "❤️"
            : "🤍"}
        </button>

      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>

    </div>
  );
}

export default MovieCard;