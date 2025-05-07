import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "../Components/Card";
import {useNavigate} from "react-router";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

export default function Characters() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API;
  const [character, setCharacter] = useState([]);
  const [info, setInfo] = useState({});

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getChar = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/character?page=${page}`);
      setCharacter(res.data.results);
      setInfo(res.data.info);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChar();
  }, [page]);
  return (
    <>
      <div className="mb-5">
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
            Let's Know Rick and Morty's Characters
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-green-400 rounded-full border-t-transparent animate-spin">
                <span className="ml-3 text-lg text-green-400">Searching the multiverse...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto p-4">
              {character.map((item, index) => (
                <Card key={index} character={item} />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6 space-x-6 items-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Previous Page"
          >
            <FaArrowLeft />
          </button>

          <span className="text-green-400 font-semibold text-lg">Page {page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!info.next}
            className={`p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition ${!info.next ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Next Page"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
