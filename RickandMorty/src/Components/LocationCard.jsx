import React from "react";
import {Link} from "react-router-dom";
const LocationCard = ({location}) => {
  return (
    <Link to={`/location/${location.id}`}>
      <div id={location.id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-green-300 p-4 space-y-4 transition transform hover:scale-105">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">{location.name}</h2>
          <p className="text-gray-500">{location.type}</p>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-semibold">Dimension:</span> {location.dimension}
          </p>
          <p>
            <span className="font-semibold">Creation Date:</span> {location.created}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
