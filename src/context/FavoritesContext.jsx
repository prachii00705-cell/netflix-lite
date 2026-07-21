import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  function toggleFavorite(movie) {
    const exists = favorites.find(
      (item) => item.id === movie.id
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (item) => item.id !== movie.id
        )
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  function isFavorite(id) {
    return favorites.some(
      (item) => item.id === id
    );
  }

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;