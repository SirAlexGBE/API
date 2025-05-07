import React, {useEffect, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import NavigateHome from "../Components/NavigateHome";

const baseUrl = import.meta.env.VITE_API;

const EpisodeDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/episode/${id}`);
        setEpisode(res.data);

        // Fetch all characters from episode
        const characterUrls = res.data.characters || [];
        const characterIds = characterUrls.map((url) => url.split("/").pop()).join(",");
        const charRes = await axios.get(`${baseUrl}/character/${characterIds}`);
        setCharacters(Array.isArray(charRes.data) ? charRes.data : [charRes.data]);
      } catch (err) {
        console.error("Failed to fetch episode or character data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-yellow-400">Retrieving episode details...</p>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-red-400 mb-4">Episode Not Found</h2>
        <button onClick={() => navigate(-1)} className="bg-yellow-500 text-black py-2 px-6 rounded-full font-bold hover:bg-yellow-400 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black py-10 px-4"
      style={{
        backgroundImage: "url('https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2023/10/rm701-1.jpg')",
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
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{episode.name}</h1>
          <p className="text-blue-300 text-lg mb-2">
            <strong>Episode Code:</strong> {episode.episode}
          </p>
          <p className="text-blue-300 text-lg mb-6">
            <strong>Air Date:</strong> {episode.air_date}
          </p>

          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Characters in this Episode</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {characters.map((char) => (
              <Link key={char.id} to={`/character/${char.id}`} className="bg-gray-800 hover:bg-gray-700 rounded-xl overflow-hidden transition transform hover:scale-105">
                <img src={char.image} alt={char.name} className="w-full h-40 object-cover" />
                <div className="p-2">
                  <h3 className="text-green-400 font-semibold text-sm">{char.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
