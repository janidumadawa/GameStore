// File: frontend/src/pages/Games.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash, Search, Star, Heart } from "lucide-react";
import AddGameForm from "../components/AddGameForm";
import { useNavigate } from "react-router-dom";

const GameCard = ({ game, isAdmin, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${game._id}`);
  };

  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 h-full flex flex-col"
      >
        {/* Shine effect */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <motion.div
              initial={{ x: "-100%", y: "-100%", opacity: 0 }}
              animate={{ x: "100%", y: "100%", opacity: 0.4 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              // Increased size to fully cover card diagonally
              className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-r from-white/30 via-white/10 to-transparent transform -rotate-45"
            />
          </div>
        )}

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-20 p-2 bg-black/50 rounded-full"
        >
          <Heart
            size={16}
            className={isLiked ? "text-red-500 fill-red-500" : "text-white"}
          />
        </button>

        {/* Game image */}
        <div className="relative h-48 overflow-hidden">
          {game.image?.trim() ? (
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
              <span className="text-slate-400">No Image</span>
            </div>
          )}
        </div>

        {/* Game info */}
        <div className="p-4 flex-1 flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white">{game.title}</h3>
            <span className="bg-slate-700 text-orange-400 text-xs px-2 py-1 rounded-full">
              {game.genre}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(game.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-1">{game.rating}</span>
          </div>

          <div className="flex justify-end items-end mt-auto">
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium rounded-lg">
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const GamesPage = ({ isAdmin = false }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/games");
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error("Failed to load games:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  const filteredGames = games.filter(
    (game) =>
      game.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteGame = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/games/${id}`, {
        method: "DELETE",
      });
      setGames(games.filter((game) => game._id !== id));
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
  try {
    if (editingGame) {
      // Update existing game
      const res = await fetch(
        `http://localhost:5000/api/games/${editingGame._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            rating: Number(formData.rating),
          }),
        }
      );
      const updatedGame = await res.json();
      setGames(games.map(g => g._id === updatedGame._id ? updatedGame : g));
    } else {
      // Add new game - use functional update to ensure we have latest state
      const res = await fetch("http://localhost:5000/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
        }),
      });
      const newGame = await res.json();
      setGames(prevGames => [...prevGames, newGame]); // Use functional update
    }
    setIsFormOpen(false);
    setEditingGame(null);
  } catch (error) {
    console.error("Operation failed:", error);
  }
};
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-orange-400">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-24">
          <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text mb-4">
            Browse Games
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setEditingGame(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-black font-medium rounded-lg"
            >
              <Plus size={18} /> Add Game
            </button>
          )}
        </div>

        {isFormOpen && (
          <AddGameForm
            game={editingGame}
            onClose={() => {
              setIsFormOpen(false);
              setEditingGame(null);
            }}
            onSubmit={handleFormSubmit}
          />
        )}

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game._id}
                game={game}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            No games found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;
