import React, {useContext, useState} from "react";
import {Users, Globe, Tv} from "lucide-react";
import {Link} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";
import "./home.css";

export default function Home() {
  const {currentUser, logout} = useContext(AuthContext);
  const [hoverIndex, setHoverIndex] = useState(null);

  const cards = [
    {
      title: "Characters",
      icon: <Users size={28} className="text-yellow-400" />,
      description: "Meet the bizarre and eccentric characters from across the multiverse—from the genius scientist Rick Sanchez to his awkward grandson Morty and more interdimensional beings.",
      img: "https://m.media-amazon.com/images/M/MV5BNzgzNjQ3NzQxMl5BMl5BanBnXkFtZTgwNjc1NTQyMTE@._V1_FMjpg_UX1276_.jpg",
      link: "/characters",
      gradientFrom: "from-green-900",
      gradientTo: "to-blue-900",
      shadowColor: "shadow-green-500/40",
      borderColor: "border-green-500/30",
      buttonBg: "bg-yellow-500",
      buttonHover: "hover:bg-yellow-400",
      buttonText: "text-black",
    },
    {
      title: "Locations",
      icon: <Globe size={28} className="text-green-400" />,
      description: "Explore strange and dangerous locations throughout the multiverse—from the Citadel of Ricks to Blips and Chitz and countless alien planets.",
      img: "https://m.media-amazon.com/images/M/MV5BOTM2ZTE1NTgtMTlhNS00NmRiLTg4ZGYtOTdhYTRjMmUzNDFlXkEyXkFqcGc@._V1_FMjpg_UX1280_.jpg",
      link: "/locations",
      gradientFrom: "from-purple-900",
      gradientTo: "to-indigo-900",
      shadowColor: "shadow-purple-500/40",
      borderColor: "border-purple-500/30",
      buttonBg: "bg-green-500",
      buttonHover: "hover:bg-green-400",
      buttonText: "text-black",
    },
    {
      title: "Episodes",
      icon: <Tv size={28} className="text-pink-400" />,
      description: "Dive into the wild adventures of Rick and Morty across seasons—from interdimensional cable to Pickle Rick, relive the most hilarious and mind-bending episodes.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbbl2lqdU1LwG2WzSfKnpV7X9hI76jC0A1w&s",
      link: "/episodes",
      gradientFrom: "from-pink-900",
      gradientTo: "to-purple-900",
      shadowColor: "shadow-pink-500/40",
      borderColor: "border-pink-500/30",
      buttonBg: "bg-pink-500",
      buttonHover: "hover:bg-pink-400",
      buttonText: "text-black",
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url('https://m.media-amazon.com/images/M/MV5BNmZkZjVlZTEtZjlmMi00N2IxLWIyYmYtYzA2YTA2MWE5ODdkXkEyXkFqcGc@._V1_FMjpg_UX1200_.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Portal glow */}
      <div className="absolute inset-0 bg-green-500 opacity-10 rounded-full blur-3xl w-3/4 h-3/4 m-auto"></div>

      <header className="relative pt-8 text-center z-10">
        <h1 className="text-5xl font-bold text-green-400 mb-2">Rick and Morty Universe</h1>
        <p className="text-xl text-blue-300">Explore the multiverse of characters and locations</p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {cards.map((card, idx) => (
            <Link to={card.link} key={idx}>
              <div
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                className={
                  `group relative overflow-hidden rounded-2xl border ${card.borderColor} bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} shadow-lg ${card.shadowColor} transform transition-transform duration-300 ` +
                  (hoverIndex === idx ? "scale-105" : "")
                }
              >
                <div className="h-60 w-full relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-brightness duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-9xl font-extrabold text-white/10 transform rotate-12 pointer-events-none">{card.title}</div>
                </div>
                <div className="p-6 text-center">
                  <div className="flex justify-center items-center mb-4 space-x-2">
                    {card.icon}
                    <h2 className="text-2xl font-extrabold text-white">{card.title}</h2>
                  </div>
                  <p className="text-gray-300 mb-6 text-sm">{card.description}</p>
                  <button className={`inline-block ${card.buttonBg} ${card.buttonText} py-2 px-6 rounded-full font-bold transition-colors duration-300 ${card.buttonHover}`}>View {card.title}</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="relative z-10 text-center py-8 text-gray-400">
        <p>Rick and Morty Multiverse Explorer Developed By Alex</p>
      </footer>
    </div>
  );
}
