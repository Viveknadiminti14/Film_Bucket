import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToWatchlist,
  removeFromWatchlist,
  isMovieInWatchlist
} from "../services/watchlistService"; // ✅ singular file name
import { useAuth } from "../context/AuthContext";

const MovieCard = ({ movie }) => {
  const { currentUser } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  // ✅ Check if movie is already in watchlist
  useEffect(() => {
    const checkWatchlist = async () => {
      if (currentUser) {
        const exists = await isMovieInWatchlist(currentUser.email, movie.id);
        setInWatchlist(exists);
      }
    };
    checkWatchlist();
  }, [currentUser, movie.id]);

  const handleWatchlist = async () => {
    if (!currentUser) {
      alert("Please log in to manage your watchlist.");
      return;
    }

    if (inWatchlist) {
      await removeFromWatchlist(currentUser.email, movie.id);
      setInWatchlist(false);
    } else {
      await addToWatchlist(
        currentUser.email,
        movie.id,
        movie.title || movie.name,
        poster
      );
      setInWatchlist(true);
    }
  };

  return (
    <div className="min-w-[160px] max-w-[180px] bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-60 object-cover"
        />
      </Link>
      <div className="p-2 text-white text-sm">
        <h3 className="truncate">{movie.title || movie.name}</h3>
        <button
          onClick={handleWatchlist}
          className={`mt-2 px-3 py-1 w-full rounded ${
            inWatchlist
              ? "bg-red-600 hover:bg-red-500"
              : "bg-cyan-600 hover:bg-cyan-500"
          } transition`}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
