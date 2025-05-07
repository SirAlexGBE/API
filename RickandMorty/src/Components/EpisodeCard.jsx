import React from "react";
import {Link} from "react-router-dom";
import {Calendar, Film} from "lucide-react";

export default function EpisodeCard({episode}) {
  return (
    <Link to={`/episode/${episode.id}`}>
      <div className="relative max-w-sm rounded-xl overflow-hidden bg-black/70 border border-green-500 shadow-[0_0_15px_2px_#22c55e80] p-4 space-y-4 transition-transform transform hover:scale-105 hover:shadow-green-400/60">
        {/* Glowing portal background swirl */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(34,197,94,0.2)_0%,_transparent_70%)] z-0 animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header icon and title */}
          <div className="flex items-center justify-center space-x-2">
            <Film className="text-green-400 drop-shadow-md" size={24} />
            <h2 className="text-lg font-bold text-green-300 text-center tracking-wide">{episode.name}</h2>
          </div>

          {/* Episode info */}
          <div className="flex justify-between items-center px-2 text-sm text-green-200 font-medium">
            <span>
              <Calendar className="inline mr-1 text-green-400" size={16} />
              {episode.air_date}
            </span>
            <span className="text-green-300 font-bold">{episode.episode}</span>
          </div>

          {/* Decorative glowing underline */}
          <div className="h-1 w-24 bg-green-400 rounded-full opacity-80 animate-pulse mx-auto mt-3 shadow-[0_0_8px_2px_#22c55e]"></div>
        </div>
      </div>
    </Link>
  );
}
