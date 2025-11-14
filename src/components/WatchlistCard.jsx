import React from "react";
import { Link } from "react-router-dom";

const WatchlistCard = ({ movie, onRemove }) => {
  const poster = movie.poster
    ? movie.poster
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md">
      <Link to={`/movie/${movie.movieId}`}>
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-60 object-cover"
        />
      </Link>
      <div className="p-2 text-white text-sm flex flex-col gap-2">
        <h3 className="truncate">{movie.title}</h3>
        <button
          onClick={onRemove}
          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded transition w-full"
        >
          Remove from Watchlist
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;
