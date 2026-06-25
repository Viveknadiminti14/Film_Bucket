import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import WatchList from "./pages/WatchList";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from './components/Navbar';
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/WatchList" element={<WatchList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
