import React from "react";
import { Link } from "react-router-dom";

const ScrollableRow = ({ title, movies }) => {
  const validMovies = Array.isArray(movies) ? movies : [];

  return (
    <div className="mb-6 px-4">
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {validMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="min-w-[160px] bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-full h-auto"nmkbjkkkk
            />
            <div className="p-2">hdkfmk
              <h3 className="text-sm font-medium text-white">
                {movie.title || movie.name}
              </h3>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScrollableRow;
