import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router";

const baseUrl = import.meta.env.VITE_API;

const locationDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [location, setlocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [residentNames, setResidentNames] = useState([]);

  useEffect(() => {
    const fetchlocation = async () => {
      try {
        const res = await axios.get(`${baseUrl}/location/${id}`);
        setlocation(res.data);
      } catch (error) {
        console.error("Failed to fetch location", error);
      } finally {
        setLoading(false);
      }
    };

    fetchlocation();
  }, [id]);

  useEffect(() => {
    if (!location || !location.residents || location.residents.length === 0) return;

    const fetchResidents = async () => {
      try {
        const residentIds = location.residents.map((url) => url.split("/").pop());
        const response = await axios.get(`${baseUrl}/character/${residentIds.join(",")}`);

        const data = Array.isArray(response.data) ? response.data : [response.data];
        const names = data.map((character) => ({
          id: character.id,
          name: character.name,
        }));
        setResidentNames(names);
      } catch (error) {
        console.error("Error fetching resident data:", error);
      }
    };

    fetchResidents();
  }, [location]);

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

  if (!location)
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
        <h2 className="text-4xl font-bold text-yellow-400 mb-4">location Not Found</h2>
        <p className="text-blue-300 mb-6">This location might be in another dimension.</p>
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
        <button onClick={() => navigate(-1)} className="text-green-400 hover:text-green-300 mb-6 flex items-center group">
          <span className="inline-block transform group-hover:-translate-x-1 transition-transform">&larr;</span>
          <span className="ml-2">Go Back</span>
        </button>

        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-2xl shadow-green-500/20 p-6 border border-green-500/20 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            {/* location Info */}
            <div className="flex-grow space-y-4">
              <h1
                className="text-4xl font-bold text-green-400 text-center md:text-left"
                style={{
                  textShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
                }}
              >
                {location.name}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-yellow-400 font-semibold">Type</h2>
                    <p className="text-blue-200">{location.type}</p>
                  </div>

                  <div>
                    <h2 className="text-yellow-400 font-semibold">Dimension</h2>
                    <p className="text-blue-200">{location.dimension}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-yellow-400 font-semibold">Creation </h2>
                  <p className="text-blue-200">{location.created}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Residents</h2>
            <div className="flex flex-wrap gap-2">
              {residentNames.map((resident, index) => (
                <Link to={`/character/${resident.id}`} key={index}>
                  <span
                    className="bg-blue-900/50 text-blue-200 px-3 py-1 rounded-full text-sm border border-blue-500/30 
                 hover:bg-blue-800/50 hover:scale-105 transition-transform duration-200 ease-in-out"
                  >
                    {resident.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default locationDetails;
