import React from "react";
import "./home.css";
import {useState} from "react";
import {Globe, Users} from "lucide-react";
import {Link} from "react-router-dom";

export default function Home() {
  // State for card hover effects
  const [characterHover, setCharacterHover] = useState(false);
  const [locationHover, setLocationHover] = useState(false);

  return (
    <div
      className="max-h-screen overflow-hidden bg-black text-white"
      style={{
        backgroundImage: "url('https://m.media-amazon.com/images/M/MV5BNmZkZjVlZTEtZjlmMi00N2IxLWIyYmYtYzA2YTA2MWE5ODdkXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg')",
        backgroundSize: "fit",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Portal effect in background */}
      <div className="absolute inset-0 bg-green-500 opacity-10 rounded-full blur-3xl w-3/4 h-3/4  "></div>

      {/* Header */}
      <header className="pt-4  text-center">
        <h1 className="text-5xl font-bold text-green-400 mb-2">Rick and Morty Universe</h1>
        <p className="text-xl text-blue-300">Explore the multiverse of characters and locations</p>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto ">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
          {/* Characters Card */}
          <div
            className={`w-full md:w-1/2 bg-gradient-to-br from-green-900 to-blue-900 rounded-lg overflow-hidden shadow-lg shadow-green-500/30 border border-green-500/20 transform transition-all duration-300 ${
              characterHover ? "scale-105" : ""
            }`}
            onMouseEnter={() => setCharacterHover(true)}
            onMouseLeave={() => setCharacterHover(false)}
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzgzNjQ3NzQxMl5BMl5BanBnXkFtZTgwNjc1NTQyMTE@._V1_FMjpg_UX1276_.jpg"
                alt="Rick and Morty Characters"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Users className="text-yellow-400 mr-3" size={28} />
                <h2 className="text-3xl font-bold text-yellow-400">Characters</h2>
              </div>
              <p className="text-blue-200 mb-6">
                Meet the bizarre and eccentric characters from across the multiverse from the genius scientist Rick Sanchez to his awkward grandson Morty and many more interdimensional beings.
              </p>
              <Link to={"/characters"}>
                <button className="bg-yellow-500 text-black py-2 px-6 rounded-full font-bold hover:bg-yellow-400 transition-colors">View Characters</button>
              </Link>
            </div>
          </div>

          {/* Locations Card */}
          <div
            className={`w-full md:w-1/2 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden shadow-lg shadow-purple-500/30 border border-purple-500/20 transform transition-all duration-300 ${
              locationHover ? "scale-105" : ""
            }`}
            onMouseEnter={() => setLocationHover(true)}
            onMouseLeave={() => setLocationHover(false)}
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="https://m.media-amazon.com/images/M/MV5BOTM2ZTE1NTgtMTlhNS00NmRiLTg4ZGYtOTdhYTRjMmUzNDFlXkEyXkFqcGc@._V1_FMjpg_UX1280_.jpg"
                alt="Rick and Morty Locations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Globe className="text-green-400 mr-3" size={28} />
                <h2 className="text-3xl font-bold text-green-400">Locations</h2>
              </div>
              <p className="text-purple-200 mb-6">
                Explore strange and dangerous locations throughout the multiverse - from the Citadel of Ricks to Blips and Chitz, and countless alien planets with mind-bending realities.
              </p>
              <button className="bg-green-500 text-black py-2 px-6 rounded-full font-bold hover:bg-green-400 transition-colors">View Locations</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-400">
        <p>© 2025 Rick and Morty Multiverse Explorer</p>
      </footer>
    </div>
  );
}
