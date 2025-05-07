import React from "react";
import {Link} from "react-router-dom";

const LocationCard = ({location}) => {
  return (
    <Link to={`/location/${location.id}`}>
      <div
        id={location.id}
        className="relative max-w-sm rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border border-purple-500 shadow-[0_0_15px_2px_#8b5cf680] p-4 space-y-4 transition-transform transform hover:scale-105 hover:shadow-purple-400/70"
      >
        {/* Glowing backdrop */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(192,132,252,0.1)_0%,_transparent_70%)] z-0 animate-pulse"></div>

        <div className="relative z-10">
          {/* Title and Type */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-purple-300">{location.name}</h2>
            <p className="text-purple-400 italic">{location.type}</p>
          </div>

          {/* Details */}
          <div className="text-sm text-purple-200 mt-2 space-y-1">
            <p>
              <span className="font-semibold text-purple-300">Dimension:</span> {location.dimension}
            </p>
            <p>
              <span className="font-semibold text-purple-300">Created:</span> {new Date(location.created).toDateString()}
            </p>
          </div>

          {/* Underline glow */}
          <div className="h-1 w-20 bg-purple-400 rounded-full opacity-80 animate-pulse mx-auto mt-3 shadow-[0_0_8px_2px_#c084fc]"></div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
