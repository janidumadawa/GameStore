import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const GameCarousel = () => {
  const [games, setGames] = useState([]);
  const [centerIndex, setCenterIndex] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const navigate = useNavigate();

  // Simulate fetching from backend
  useEffect(() => {
  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/games");
      if (!response.ok) throw new Error("Failed to fetch games");
      const data = await response.json();
      const normalizedGames = data.map((game) => ({
        id: game._id,       // adapt if your backend uses _id
        title: game.title,
        genre: game.genre,
        image: game.image,
      }));
      setGames(normalizedGames);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchGames();
}, []);


  // Auto-rotation effect
  useEffect(() => {
    if (!autoplay || games.length === 0) return;
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % games.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoplay, games]);

  // Get 5 visible games with center focus
  const getVisibleGames = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (centerIndex + i + games.length) % games.length;
      visible.push({
        ...games[index],
        position: i, // -2, -1, 0, 1, 2 (center is 0)
      });
    }
    return visible;
  };

  const handleNext = () => {
    setAutoplay(false);
    setCenterIndex((prev) => (prev + 1) % games.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCenterIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleCardClick = (position) => {
    if (position !== 0) {
      setAutoplay(false);
      setCenterIndex((prev) => (prev + position + games.length) % games.length);
    }
  };

  const visibleGames = getVisibleGames();
  const centerGame = visibleGames.find((game) => game.position === 0);

  if (isLoading) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-orange-400 text-xl">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Featured Games
            </span>
          </h2>
        </div>

        {/* Main Carousel Container */}
        <div className="relative">
          {/* Cards Container */}
          <div className="relative h-96 flex items-center justify-center">
            <AnimatePresence>
              {visibleGames.map((game) => {
                const isCenter = game.position === 0;
                const isAdjacent = Math.abs(game.position) === 1;
                const isEdge = Math.abs(game.position) === 2;

                return (
                  <motion.div
                    key={`${game.id}-${game.position}`}
                    className={`absolute cursor-pointer ${
                      isCenter ? "z-30" : isAdjacent ? "z-20" : "z-10"
                    }`}
                    initial={{
                      x: game.position * 200,
                      scale: isCenter ? 1 : isAdjacent ? 0.8 : 0.6,
                      opacity: isEdge ? 0.4 : 1,
                    }}
                    animate={{
                      x: game.position * 200,
                      scale: isCenter ? 1.1 : isAdjacent ? 0.85 : 0.6,
                      opacity: isEdge ? 0.3 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.6,
                    }}
                    onClick={() => {
                      if (game.position === 0) {
                        navigate(`/game/${game.id}`); // Navigate to game details
                    }
                  }}
                  >
                    {/* Card */}
                    <div
                      className={`w-64 h-80 rounded-2xl overflow-hidden shadow-2xl
                                   ${
                                     isCenter
                                       ? "bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/50"
                                       : "bg-slate-800 border border-slate-700"
                                   }
                                   transition-all duration-300`}
                    >
                      {/* Game Image */}
                      <div
                        className={`h-48 ${
                          isCenter
                            ? "bg-gradient-to-br from-orange-900/30 to-yellow-900/30"
                            : "bg-slate-700"
                        }`}
                      >
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Game Info */}
                      <div className="p-6">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium
                                        ${
                                          isCenter
                                            ? "bg-orange-500/20 text-orange-400"
                                            : "bg-slate-600 text-gray-300"
                                        }`}
                        >
                          {game.genre}
                        </span>

                        <h3
                          className={`font-bold mt-3 ${
                            isCenter
                              ? "text-white text-lg"
                              : "text-gray-300 text-base"
                          }`}
                        >
                          {game.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 
                     bg-slate-800/80 hover:bg-orange-500/80 p-3 rounded-full text-white
                     border border-slate-600 hover:border-orange-500 transition-all duration-200
                     backdrop-blur-sm shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 
                     bg-slate-800/80 hover:bg-orange-500/80 p-3 rounded-full text-white
                     border border-slate-600 hover:border-orange-500 transition-all duration-200
                     backdrop-blur-sm shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false);
                setCenterIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === centerIndex
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 scale-125"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCarousel;
