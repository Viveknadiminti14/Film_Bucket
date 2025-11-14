import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ScrollableRow from "../components/ScrollableRow";
import FilterBar from "../components/FilterBar";

import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  searchMovies,
  discoverMovies,
} from "../services/api";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    genre: "",
    year: "",
    language: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const t = await getTrendingMovies();
        const p = await getPopularMovies();
        const u = await getUpcomingMovies();

        setTrending(t.results || []);
        setPopular(p.results || []);
        setUpcoming(u.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearchOrFilter = async () => {
      try {
        if (searchTerm.trim()) {
          const result = await searchMovies(searchTerm);
          setFilteredMovies(result.results || []);
        } else if (
          filterOptions.genre ||
          filterOptions.year ||
          filterOptions.language
        ) {
          const result = await discoverMovies(filterOptions);
          setFilteredMovies(result.results || []);
        } else {
          setFilteredMovies([]);
        }
      } catch (error) {
        console.error("Error while fetching filtered/search results:", error);
      }
    };

    handleSearchOrFilter();
  }, [searchTerm, filterOptions]);

  return (
    <div className="bg-black min-h-screen pb-10">
      {/* 🎬 Hero Section with Search */}
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 🎯 Filter Bar */}
      <div className="px-4 py-6">
        <FilterBar onFilter={(options) => setFilterOptions(options)} />
      </div>

      {/* 🔍 Search or Filter Results */}
      {filteredMovies.length > 0 && (
        <div className="px-4">
          <ScrollableRow title="🎯 Filtered Results" movies={filteredMovies} />
        </div>
      )}

      {/* 🧩 Default Movie Sections */}
      {filteredMovies.length === 0 && (
        <div className="px-4 space-y-10">
          <ScrollableRow title="🔥 Trending Now" movies={trending} />
          <ScrollableRow title="⭐ What's Popular" movies={popular} />
          <ScrollableRow title="🎬 Upcoming Releases" movies={upcoming} />
        </div>
      )}
    </div>
  );
};

export default Home;
