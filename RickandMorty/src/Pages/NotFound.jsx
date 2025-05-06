import {useState, useEffect} from "react";
import {ArrowLeft, Zap} from "lucide-react";

export default function NotFound() {
  const [portalActive, setPortalActive] = useState(false);
  const [quote, setQuote] = useState("");

  // Random Rick and Morty quotes
  const quotes = [
    "Wubba Lubba Dub Dub!",
    "I'm Pickle Rick!",
    "Nobody exists on purpose. Nobody belongs anywhere. Everybody's gonna die. Come watch TV.",
    "Sometimes science is more art than science.",
    "What, so everyone's supposed to sleep every single night now?",
    "The universe is basically an animal. It grazes on the ordinary.",
    "To live is to risk it all; otherwise you're just an inert chunk of randomly assembled molecules.",
    "I turned myself into a pickle, Morty!",
    "That's the way the news goes!",
    "And that's the waaaaay the news goes!",
  ];

  useEffect(() => {
    // Set a random quote when component mounts
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Activate portal effect after a small delay
    const timer = setTimeout(() => {
      setPortalActive(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/api/placeholder/1200/800')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
      }}
    >
      {/* Animated portal effect */}
      <div
        className={`absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 
        ${portalActive ? "animate-spin-slow" : ""} blur-md`}
        style={{
          boxShadow: "0 0 120px 60px rgba(16, 185, 129, 0.6)",
          transform: portalActive ? "scale(1.1)" : "scale(1)",
          transition: "transform 2s ease-in-out",
        }}
      ></div>

      {/* Portal inner glow */}
      <div className="absolute w-48 h-48 md:w-80 md:h-80 rounded-full bg-black opacity-70"></div>

      {/* Random portal particles */}
      {portalActive &&
        Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full animate-float"
              style={{
                left: `${45 + Math.random() * 10}%`,
                top: `${45 + Math.random() * 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}

      {/* Content */}
      <div className="z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-green-400 mb-2">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6">Dimension Not Found</h2>

        <div className="max-w-md mb-8 text-blue-200">
          <p className="mb-4">Looks like you've wandered into a dimension that doesn't exist in our multiverse!</p>
          <p className="italic text-green-300">"{quote}"</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-black font-bold py-3 px-6 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
            Return to Previous Dimension
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            <Zap size={20} />
            Go Home
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(5px) translateX(5px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
