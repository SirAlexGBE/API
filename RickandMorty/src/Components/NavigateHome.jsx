import React from "react";
import {useNavigate} from "react-router-dom";
import {Home} from "lucide-react";

export default function NavigateHome() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")} className="text-green-400 hover:text-green-300 mb-6 flex items-center group" title="Go to Home">
      <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline">Home</span>
    </button>
  );
}
