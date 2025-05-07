import React from "react";
import {Link} from "react-router-dom";

const Card = ({character}) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div
        id={character.id}
        className="relative max-w-sm rounded-2xl overflow-hidden bg-black/80 border border-green-500 shadow-[0_0_15px_2px_#22c55e80] p-4 space-y-4 transition transform hover:scale-105 hover:shadow-green-400/60"
      >
        {/* Portal-style glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(34,197,94,0.1)_0%,_transparent_80%)] z-0 animate-pulse"></div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Character image */}
          <img className="w-full rounded-xl border-2 border-green-400 shadow-md" src={character.image} alt={character.name} />

          {/* Name and status */}
          <div className="text-center mt-2">
            <h2 className="text-xl font-bold text-green-300">{character.name}</h2>
            <p className="text-green-400 italic">
              {character.status} - {character.species}
            </p>
          </div>

          {/* Additional info */}
          <div className="text-sm text-green-200 mt-2 space-y-1">
            <p>
              <span className="font-semibold text-green-300">Gender:</span> {character.gender}
            </p>
            <p>
              <span className="font-semibold text-green-300">Origin:</span> {character.origin.name}
            </p>
            <p>
              <span className="font-semibold text-green-300">Location:</span> {character.location.name}
            </p>
          </div>

          {/* Glowing underline */}
          <div className="h-1 w-24 bg-green-400 rounded-full opacity-80 animate-pulse mx-auto mt-3 shadow-[0_0_8px_2px_#22c55e]"></div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
