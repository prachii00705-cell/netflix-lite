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
      <img
        loading="lazy"
        src={
          IMAGE_BASE_URL + movie.poster_path
        }
        alt={movie.title}
      />

      <h3>{movie.title}</h3>

      <p>{movie.release_date?.slice(0, 4)}</p>

      <p>
        ⭐ {movie.vote_average.toFixed(1)}
      </p>

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
  );
}

export default MovieCard;