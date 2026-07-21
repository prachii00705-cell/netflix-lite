import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  lastMovieRef,
}) {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          ref={
            index === movies.length - 1
              ? lastMovieRef
              : null
          }
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;