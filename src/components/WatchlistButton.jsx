import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const WatchlistButton = ({ movie }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkWatchlist = async () => {
      if (!user) return;
      const movieRef = doc(db, "users", user.uid, "watchlist", movie.id.toString());
      const docSnap = await getDoc(movieRef);
      setIsAdded(docSnap.exists());
    };
    checkWatchlist();
  }, [user, movie.id]);

  const toggleWatchlist = async () => {
    if (!user) {
      alert("Please log in to manage your watchlist!");
      return;
    }

    const movieRef = doc(db, "users", user.uid, "watchlist", movie.id.toString());
    try {
      if (isAdded) {
        await deleteDoc(movieRef);
        setIsAdded(false);
      } else {
        await setDoc(movieRef, movie);
        setIsAdded(true);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 
        ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
    >
      {isAdded ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      {isAdded ? "Added to Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;
