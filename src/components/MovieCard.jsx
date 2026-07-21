import { IMAGE_BASE_URL } from "../utils/constants";

function MovieCard({ movie }) {
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

      <p>
        ⭐ {movie.vote_average.toFixed(1)}
      </p>

      <p>{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;