import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router";
import NavigateHome from "../Components/NavigateHome";

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

  // Status badge color based on character status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500"; // unknown
    }
  };

  if (loading)
    return (
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/api/placeholder/1200/800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        }}
      >
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-green-400">Searching across dimensions...</p>
      </div>
    );

  if (!character)
    return (
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/api/placeholder/1200/800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        }}
      >
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Character Not Found</h2>
        <p className="text-blue-300 mb-6">This character might be in another dimension.</p>
        <button onClick={() => navigate(-1)} className="bg-green-500 text-black py-2 px-6 rounded-full font-bold hover:bg-green-400 transition-colors">
          Go Back
        </button>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-black py-10 px-4"
      style={{
        backgroundImage: "url('https://m.media-amazon.com/images/M/MV5BODcyNGVhZmUtYjI0Yy00YjM5LWI0ZTQtOGJiNGNmOTcwOTZlXkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Portal effect in background */}
      <div className="fixed inset-0 bg-green-500 opacity-10 rounded-full blur-3xl w-3/4 h-3/4 mx-auto my-auto -z-10"></div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center px-4">
          <button onClick={() => navigate(-1)} className="text-green-400 hover:text-green-300 mb-6 flex items-center group">
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            <span className="ml-2">Go Back</span>
          </button>
          <NavigateHome />
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-2xl shadow-green-500/20 p-6 border border-green-500/20 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Character Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 mx-auto md:mx-0">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-30"></div>
                <img src={character.image} alt={character.name} className="w-full h-full rounded-xl object-cover relative z-10 border-2 border-green-400/30" />
              </div>
            </div>

            {/* Character Info */}
            <div className="flex-grow space-y-4">
              <h1
                className="text-4xl font-bold text-green-400 text-center md:text-left"
                style={{
                  textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
                }}
              >
                {character.name}
              </h1>

              <div className="flex items-center justify-center md:justify-start mb-2">
                <span className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(character.status)}`}></span>
                <span className="text-blue-300 font-medium">{character.status}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-yellow-400 font-semibold">Species</h2>
                    <p className="text-blue-200">{character.species}</p>
                  </div>

                  <div>
                    <h2 className="text-yellow-400 font-semibold">Gender</h2>
                    <p className="text-blue-200">{character.gender}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-yellow-400 font-semibold">Origin</h2>
                    <p className="text-blue-200">{character.origin?.name}</p>
                    {character.origin?.url && (
                      <Link to={`/location/${character.origin?.url?.split("/").pop()}`} className="text-green-400 hover:text-green-300 text-sm inline-flex items-center mt-1 transition-colors">
                        <span>View origin location</span>
                        <span className="ml-1">→</span>
                      </Link>
                    )}
                  </div>

                  <div>
                    <h2 className="text-yellow-400 font-semibold">Current Location</h2>
                    <p className="text-blue-200">{character.location?.name}</p>
                    {character.location?.url && (
                      <Link to={`/location/${character.location?.url?.split("/").pop()}`} className="text-green-400 hover:text-green-300 text-sm inline-flex items-center mt-1 transition-colors">
                        <span>View location details</span>
                        <span className="ml-1">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Episode Appearances</h2>
            <div className="flex flex-wrap gap-2">
              {character.episode?.map((ep, index) => {
                const episodeNumber = ep.split("/").pop();
                return (
                  <span
                    key={index}
                    className="bg-blue-900/50 text-blue-200 px-3 py-1 rounded-full text-sm border border-blue-500/30 
                   hover:bg-blue-800/50 hover:scale-105 transition-transform duration-200 ease-in-out"
                  >
                    Episode {episodeNumber}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
