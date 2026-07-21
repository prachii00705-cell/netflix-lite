import { useContext } from "react";

import { FavoritesContext } from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";

function Favorites() {
  const { favorites } =
    useContext(FavoritesContext);

  return (
    <div className="home">
      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <span className="empty-icon">
            💔
          </span>

          <h2>No favorites yet.</h2>

          <p>
            Start exploring movies and
            click the heart icon to add
            them here.
          </p>
        </div>
      ) : (
        <div className="favorites-grid">
          <MovieGrid movies={favorites} />
        </div>
      )}
    </div>
  );
}

export default Favorites;