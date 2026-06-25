import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
  getMovieDetails,
  getMovieVideos,
  getWatchProviders,
  getMovieCredits,
  getSimilarMovies,
  getPopularTVShows,
} from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [ottPlatforms, setOttPlatforms] = useState([]);
  const [cast, setCast] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  // 🔹 Fetch movie data
  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieDetails(id);
      setMovie(movieData);

      const videosData = await getMovieVideos(id);
      const officialTrailer = videosData.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(officialTrailer);

      const providersData = await getWatchProviders(id);
      const indianProviders = providersData.results?.IN?.flatrate || [];
      setOttPlatforms(indianProviders);

      const creditsData = await getMovieCredits(id);
      setCast(creditsData.cast.slice(0, 8));

      const similar = await getSimilarMovies(id);
      setSimilarMovies(similar.results.slice(0, 8));
    };

    fetchData();

    // 🔐 Firebase user listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [id]);

  // 🔹 Check if movie already exists in watchlist
  useEffect(() => {
    const checkIfInWatchlist = async () => {
      if (!user || !movie?.id) return;
      try {
        const movieRef = doc(db, "users", user.uid, "watchlist", movie.id.toString());
        const docSnap = await getDoc(movieRef);
        if (docSnap.exists()) setIsAdded(true);
      } catch (err) {
        console.error("Error checking watchlist:", err);
      }
    };
    checkIfInWatchlist();
  }, [user, movie]);

  // 🔖 Add movie to watchlist
const addToWatchlist = async (movie) => {
  if (!user) {
    alert("Please log in to add to your watchlist.");
    return;
  }

  try {
    const userWatchlistRef = doc(
      db,
      "users",
      user.uid,
      "watchlist",
      movie.id.toString()
    );

    await setDoc(userWatchlistRef, movie);
    setIsAdded(true); // ✅ Update state
    alert("✅ Movie added to your watchlist!");
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    alert("❌ Failed to add to watchlist. Check console for details.");
  }
};


  // ⏳ Loading state
  if (!movie) {
    return <div className="text-white p-4">Loading movie details...</div>;
  }

  return (
    <div className="text-white p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-400 mb-2">{movie.tagline}</p>
      <p className="mb-4 text-gray-300">{movie.overview}</p>

      {/* ⭐ Rating */}
      <p className="text-yellow-400 font-semibold mb-6">
        IMDb Rating: {movie.vote_average?.toFixed(1)} / 10
      </p>

      {/* 🎬 Movie Info */}
      <div className="flex-1">
        <p className="mb-2">
          <strong>Release Date:</strong>{" "}
          {movie.release_date || movie.first_air_date || "Unknown"}
        </p>
        <p className="mb-2">
          <strong>Rating:</strong> ⭐ {movie.vote_average || "N/A"}
        </p>
        <div className="flex gap-2 mb-4 flex-wrap">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {/* 🔖 Watchlist Button */}
{user && (
  <button
    onClick={() => addToWatchlist(movie)}
    disabled={isAdded}
    
    className={`px-4 py-2 rounded-lg ${
      isAdded
        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue700 text-white"
    }`}
  >
    {isAdded ? "Added to Watchlist ✅" : "Add to Watchlist"}
</button>

)}

      {/* 🎥 Trailer */}
      {trailer && (
        <div className="mb-8 mt-6">
          <h2 className="text-2xl font-semibold mb-2">Official Trailer</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>
      )}

      {/* 📺 OTT Platforms */}
      {ottPlatforms.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Available On</h2>
          <div className="flex gap-4 flex-wrap">
            {ottPlatforms.map((provider) => (
              <div key={provider.provider_id} className="flex flex-col items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-16 h-16 object-contain mb-1"
                />
                <span className="text-sm">{provider.provider_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🎭 Cast */}
      {cast.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Cast</h2>
          <div className="flex overflow-x-auto gap-4">
            {cast.map((actor) => (
              <div key={actor.id} className="w-28 flex-shrink-0 text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-lg w-24 h-36 object-cover mx-auto mb-1"
                />
                <p className="text-sm">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🎞️ Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <p className="text-sm p-2">{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
