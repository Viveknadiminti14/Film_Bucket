import React from "react";
import { Link } from "react-router-dom";
import { Film, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-md text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-cyan-400">
          <Film size={24} />
          <span>Film Bucket</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
          <Link to="/watchlist" className="hover:text-cyan-300 transition">Watchlist</Link>
          <Link to="/about" className="hover:text-cyan-300 transition">About</Link>
        </div>

          {currentUser ? (
            <div className="flex items-center space-x-3">
              {/* Profile Picture */}
              <img
                src={currentUser.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-cyan-400"
              />
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1 bg-cyan-600 hover:bg-red-500 text-sm rounded-full transition"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-sm rounded-full transition"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
