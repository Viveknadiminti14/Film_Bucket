// src/pages/Login.jsx
import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="w-80 p-6 bg-gray-800 rounded-lg shadow-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
        />
        <button type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
      >
        <FcGoogle size={20} /> Sign in with Google
      </button>

      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
