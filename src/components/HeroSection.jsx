import React from "react";

const HeroSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div
      className="relative w-full h-[65vh] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/m1fgGSLK0WvRpzM1AmZu38m0Tx8.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome.</h1>
        <p className="text-lg md:text-xl mb-6">
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>

        {/* 🔍 Search Input (bound to searchTerm state) */}
        <input
          type="text"
          placeholder="Search for a movie, tv show, person..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-full bg-white text-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default HeroSection;
