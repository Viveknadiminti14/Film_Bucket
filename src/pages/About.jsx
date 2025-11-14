import React from "react";

const About = () => {
  return (
    <div className="pt-20 px-4 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">About Film Bucket</h1>
      <p className="text-lg text-gray-300 mb-4">
        Welcome to <span className="text-cyan-400 font-semibold">Film Bucket</span> 🎬 — your one-stop
        platform to discover, track, and enjoy movies like never before!
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="text-gray-300 mb-4">
        To make movie discovery simple, fun, and personalized. Whether you’re into Hollywood
        blockbusters or hidden indie gems, we’ve got you covered.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Features</h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>🎬 Detailed movie info & trailers</li>
        <li>📌 Personal watchlist synced with your account</li>
        <li>🔍 Search & filter movies easily</li>
        <li>📱 Mobile-friendly design</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-300">
        Have suggestions? Email us at{" "}
        <a
          href="mailto:support@filmbucket.com"
          className="text-cyan-400 hover:underline"
        >
          support@filmbucket.com
        </a>
      </p>
    </div>
  );
};

export default About;
