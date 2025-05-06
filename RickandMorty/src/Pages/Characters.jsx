import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "../Components/Card";

export default function Characters() {
  const baseUrl = import.meta.env.VITE_API;
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const getChar = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/character`);
      setCharacter(res.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getChar();
  }, []);
  return (
    <>
      <div
        className="min-h-screen bg-black py-3"
        style={{
          backgroundImage: "url('/api/placeholder/1200/800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
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
            {character.map((item) => (
              <Card key={character.id} character={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
