import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function getPopularMovies(page = 1) {
  const response = await api.get(`/movie/popular?page=${page}`);
  return response.data;
}

export async function searchMovies(query, page = 1) {
  const response = await api.get(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
  return response.data;
}