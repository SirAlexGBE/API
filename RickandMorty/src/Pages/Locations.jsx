import React, {useState, useEffect} from "react";
import axios from "axios";
import LocationCard from "../Components/LocationCard";
import {useNavigate} from "react-router";
export default function Locations() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API;
  const [location, setlocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const getlocation = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/location`);
      setlocation(res.data.results);
      console.log(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getlocation();
  }, []);
  return (
    <>
      <div
        className="min-h-screen bg-black py-3"
        style={{
          backgroundImage: "url('https://m.media-amazon.com/images/M/MV5BODcyNGVhZmUtYjI0Yy00YjM5LWI0ZTQtOGJiNGNmOTcwOTZlXkEyXkFqcGc@._V1_FMjpg_UX2160_.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="max-w-4xl mx-auto absolute top-2 left-2">
          <button onClick={() => navigate(-1)} className="text-green-400 hover:text-green-300 mb-6 flex items-center group">
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            <span className="ml-2">Go Back</span>
          </button>
        </div>
        <h2
          className="text-2xl font-bold mb-6 text-center text-green-400"
          style={{
            textShadow: "0 0 10px rgba(74, 222, 128, 0.6)",
          }}
        >
          Let's Know Rick and Morty's locations
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-green-400 rounded-full border-t-transparent animate-spin">
              <span className="ml-3 text-lg text-green-400">Searching the multiverse...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto p-4">
            {location.map((item, index) => (
              <LocationCard key={index} location={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
