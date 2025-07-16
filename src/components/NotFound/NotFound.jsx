import React from "react";
import { Link } from "react-router";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#640d14] via-[#7a1c23] to-[#000000] text-white px-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Ghost size={80} className="text-white animate-pulse" />
        </div>
        <h1 className="text-6xl font-bold tracking-wide">404</h1>
        <p className="text-xl">Oops! Page not found</p>
        <p className="text-sm text-gray-300 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. But don’t worry,
          you can always go back to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-white text-[#640d14] rounded-md text-sm font-semibold shadow-md hover:bg-gray-100 transition"
        >
          ← Back to Home
        </Link>
      </div> 
    </div>
  );
};

export default NotFound;