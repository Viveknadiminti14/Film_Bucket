import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { currentUser } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!currentUser) return;

      try {
        const watchlistRef = collection(db, "users", currentUser.uid, "watchlist");
        const snapshot = await getDocs(watchlistRef);
        const movies = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWatchlist(movies);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [currentUser]);

  // 🔥 Remove a movie from Firestore
const handleRemove = async (movieId) => {
  if (!currentUser) return;

  try {
    console.log("Removing movie:", movieId, typeof movieId);

    const idToDelete = movieId.toString(); // convert to string for safety
    await deleteDoc(doc(db, "users", currentUser.uid, "watchlist", idToDelete));

    setWatchlist((prev) => prev.filter((movie) => movie.id !== movieId));
    alert("✅ Removed from watchlist");
  } catch (error) {
    console.error("Error removing movie:", error);
    alert(`❌ Failed to remove movie: ${error.message}`);
  }
};


  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-8 gap-4">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-2 rounded-lg hover:scale-105 transition-transform duration-200"
            >
              {/* ✅ Clickable Link to Movie Details */}
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md hover:opacity-90 transition"
                />
                <h3 className="mt-2 text-sm text-center">{movie.title}</h3>
              </Link>

              {/* 🗑️ Remove Button */}
              <button
                onClick={() => handleRemove(movie.id)}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
