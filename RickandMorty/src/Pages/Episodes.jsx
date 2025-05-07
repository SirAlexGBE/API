import React, {useState, useEffect} from "react";
import axios from "axios";
import EpisodeCard from "../Components/EpisodeCard";
import NavigateHome from "../Components/NavigateHome";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useNavigate} from "react-router";
export default function Episodes() {
  const baseUrl = import.meta.env.VITE_API;
  const [episodes, setEpisodes] = useState([]);
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getEpisodes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/episode?page=${page}`);
      setEpisodes(res.data.results);
      setInfo(res.data.info);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setEpisodes([]);
      setInfo({});
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [page]);

  return (
    <div
      className="min-h-screen py-6"
      style={{
        backgroundImage: "url('https://static1.srcdn.com/wordpress/wp-content/uploads/2020/03/rick-morty-summer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <h1 className="text-3xl font-bold text-green-400 text-shadow-glow text-center w-full">Episodes of Rick and Morty</h1>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center px-4">
          <button onClick={() => navigate(-1)} className="text-green-400 hover:text-green-300 mb-6 flex items-center group">
            <span className="inline-block transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            <span className="ml-2">Go Back</span>
          </button>
          <NavigateHome />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-green-400 rounded-full border-t-transparent animate-spin"></div>
          <span className="ml-3 text-lg text-green-300">Charging portal gun...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-6 items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaArrowLeft />
            </button>

            <span className="text-green-300 font-semibold text-lg">Page {page}</span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!info.next}
              className={`p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition ${!info.next ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
