const API_BASE = "http://localhost:5000/watchlist"; // ✅ Change to your backend URL

// Add movie to watchlist
export const addToWatchlist = async (userEmail, movieId, movieTitle, moviePoster) => {
  try {
    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail,
        movieId,
        movieTitle,
        moviePoster,
      }),
    });

    if (!res.ok) throw new Error("Failed to add to watchlist");
    return await res.json();
  } catch (error) {
    console.error("❌ Error adding to watchlist:", error);
    throw error;
  }
};

// Get all movies in a user's watchlist
export const getUserWatchlist = async (userEmail) => {
  try {
    const res = await fetch(`${API_BASE}/${userEmail}`);
    if (!res.ok) throw new Error("Failed to fetch watchlist");
    return await res.json();
  } catch (error) {
    console.error("❌ Error fetching watchlist:", error);
    return [];
  }
};

// Remove movie from watchlist
export const removeFromWatchlist = async (userEmail, movieId) => {
  try {
    const res = await fetch(`${API_BASE}/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail, movieId }),
    });

    if (!res.ok) throw new Error("Failed to remove from watchlist");
    return await res.json();
  } catch (error) {
    console.error("❌ Error removing from watchlist:", error);
  }
};

// Check if movie exists in watchlist
export const isMovieInWatchlist = async (userEmail, movieId) => {
  try {
    const list = await getUserWatchlist(userEmail);
    return list.some((movie) => movie.movieId === movieId);
  } catch (error) {
    console.error("❌ Error checking watchlist:", error);
    return false;
  }
};
