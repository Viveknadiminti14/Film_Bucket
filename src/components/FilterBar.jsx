import React, { useEffect, useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    // Example genre list; replace with TMDB API if needed
    setGenres([
      { id: 28, name: "Action" },
      { id: 35, name: "Comedy" },
      { id: 18, name: "Drama" },
      { id: 27, name: "Horror" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 9648, name: "Mystery" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ]);
  }, []);

  useEffect(() => {
    onFilter({
      genre: selectedGenre,
      year,
      language,
    });
  }, [selectedGenre, year, language]);

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl 
                    bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
      {/* Filters */}
      <h2 className="text-lg font-semibold text-blue">Filters</h2>
      {/* 🎯 Genre Filter */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="bg-transparent px-4 py-2 rounded-lg text-white text-sm 
                   border border-white/30 focus:outline-none focus:border-white/60"
      >
        <option value="" className="bg-gray-900">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id} className="bg-gray-900">
            {g.name}
          </option>
        ))}
      </select>

      {/* 📅 Year Filter */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="bg-transparent px-4 py-2 rounded-lg text-white text-sm 
                   border border-white/30 focus:outline-none focus:border-white/60"
      >
        <option value="" className="bg-gray-900">Any Year</option>
        {Array.from({ length: 24 }, (_, i) => 2025 - i).map((y) => (
          <option key={y} value={y} className="bg-gray-900">
            {y}
          </option>
        ))}
      </select>

      {/* 🌐 Language Filter */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-transparent px-4 py-2 rounded-lg text-white text-sm 
                   border border-white/30 focus:outline-none focus:border-white/60"
      >
        <option value="" className="bg-gray-900">Any Language</option>
        <option value="en" className="bg-gray-900">English</option>
        <option value="hi" className="bg-gray-900">Hindi</option>
        <option value="ta" className="bg-gray-900">Tamil</option>
        <option value="te" className="bg-gray-900">Telugu</option>
        <option value="fr" className="bg-gray-900">French</option>
        <option value="es" className="bg-gray-900">Spanish</option>
        <option value="zh" className="bg-gray-900">Chinese</option>
        <option value="ar" className="bg-gray-900">Arabic</option>
        <option value="ko" className="bg-gray-900">Korean</option>
        <option value="bn" className="bg-gray-900">Bengali</option>     
        <option value="de" className="bg-gray-900">German</option>
        <option value="ja" className="bg-gray-900">Japanese</option>
      </select>
    </div>
  );
};

export default FilterBar;
