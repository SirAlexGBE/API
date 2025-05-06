import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router";

const baseUrl = import.meta.env.VITE_API;

const CharacterDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(`${baseUrl}/character/${id}`);
        setCharacter(res.data);
      } catch (error) {
        console.error("Failed to fetch character", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!character) return <div className="text-center mt-10">Character not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full space-y-6">
        <p onClick={() => navigate(-1)} className="text-blue-500 hover:underline text-sm cursor-pointer">
          &larr; Go Back
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img src={character.image} alt={character.name} className="w-48 h-48 rounded-xl shadow-md object-cover" />
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">{character.name}</h1>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span> {character.status}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Species:</span> {character.species}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Gender:</span> {character.gender}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <h2 className="font-semibold text-gray-800 mb-1">Origin</h2>
            <p>{character.origin?.name}</p>
            <a href={character.origin?.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">
              View origin details
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-1">Current Location</h2>
            <p>{character.location?.name}</p>
            <a href={character.location?.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">
              View location details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
