import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


export async function getPopularMovies(page = 1) {
  const response = await api.get(
    "/movie/popular",
    {
      params: {
        api_key: API_KEY,
        page,
      },
    }
  );

  return response.data;
}


export async function searchMovies(
  query,
  page = 1
) {
  const response = await api.get(
    "/search/movie",
    {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    }
  );

  return response.data;
}