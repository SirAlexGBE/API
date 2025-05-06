import React from "react";
import {Link} from "react-router-dom";
const Card = ({character}) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div id={character.id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4 space-y-4 transition transform hover:scale-105">
        <img className="w-full rounded-xl" src={character.image} alt={character.name} />
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">{character.name}</h2>
          <p className="text-gray-500">
            {character.status} - {character.species}
          </p>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-semibold">Gender:</span> {character.gender}
          </p>
          <p>
            <span className="font-semibold">Origin:</span> {character.origin.name}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {character.location.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
