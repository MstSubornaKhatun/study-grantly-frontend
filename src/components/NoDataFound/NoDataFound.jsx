import React from "react";
import { FileQuestion } from "lucide-react";

const NoDataFound = ({ message = "No Data Found" }) => {
  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-[#640d14]/10 p-8 rounded-full shadow-2xl animate-bounce mb-6">
        <FileQuestion size={72} className="text-[#640d14]" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-[#640d14] drop-shadow mb-3">
        {message}
      </h1>

      <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
        Looks like there's nothing to show here right now. Check back later or try reloading the page.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-3 text-white bg-[#640d14] hover:bg-[#4f0b10] transition-all duration-300 rounded-lg text-base font-medium shadow-md"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default NoDataFound;