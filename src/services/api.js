const TMDB_API_KEY = "f1dd117eac16b1fbcbaf3e24cead2589"; // 🔑 Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";

// services/api.js
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const addToWatchlist = async (movie, userEmail) => {
  const movieRef = doc(db, "users", userEmail, "watchlist", movie.id.toString());
  await setDoc(movieRef, {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    timestamp: Date.now(),
  });
};


// Fetch Trending Movies
export const getTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return await res.json();
};

// Fetch Popular Movies
export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return await res.json();
};

// Fetch Upcoming Movies
export const getUpcomingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch upcoming movies");
  return await res.json();
};

// Search Movies by Keyword
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search movies");
  return await res.json();
};

// Discover Movies by Filters
export const discoverMovies = async (filters) => {
  const { genre, year, language } = filters;
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}&primary_release_year=${year}&with_original_language=${language}`
  );
  if (!res.ok) throw new Error("Failed to discover movies");
  return await res.json();
};

// Fetch Movie Details by ID
export const getMovieDetails = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return await res.json();
};

// Fetch Movie Videos (like trailers)
export const getMovieVideos = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie videos");
  return await res.json();
};

// Fetch OTT Watch Providers
export const getWatchProviders = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch watch providers");
  return await res.json();
};
// Cast and Crew
export const getMovieCredits = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie credits");
  return await res.json();
};

// Similar Movies
export const getSimilarMovies = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch similar movies");
  return await res.json();
};
