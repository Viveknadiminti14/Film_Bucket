import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/WatchList";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from './components/Navbar';
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-black min-h-screen text-white">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4"></h1>
            <p className="text-gray-400 mb-6"></p>
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/Watchlist" element={<Watchlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;