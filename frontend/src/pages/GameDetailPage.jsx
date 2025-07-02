// File: frontend/src/pages/GameDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddGameForm from "../components/AddGameForm";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Download,
  Play,
  Calendar,
  Users,
  Gamepad2,
  ExternalLink,
  Edit,
  Trash,
} from "lucide-react";

const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    console.log(`User: username=${user?.username}, role=${user?.role}`);

    const fetchGame = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/games/${id}`);
        if (!res.ok) {
          throw new Error("Game not found");
        }
        const data = await res.json();
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
        }
      />
    ));
  };

  const handleDownload = () => {
    if (game.downloadLink) {
      window.open(game.downloadLink, "_blank");
    } else {
      alert("Download link not available.");
    }
  };

  const extractVideoId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading game details...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Game Not Found
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const videoId = extractVideoId(game.video);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header with Back Button */}
      <div className="fixed top-14 left-20 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Games
          </button>

          {/* Admin Controls - Moved to header */}
          <div className="flex items-center gap-4">
            {isAdmin && (
              <div className="fixed top-20 right-10 z-50">
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
                    title="Edit Game"
                  >
                    <Edit size={18} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this game?"
                        )
                      ) {
                        try {
                          const res = await fetch(
                            `http://localhost:5000/api/games/${game._id}`,
                            { method: "DELETE" }
                          );
                          if (!res.ok) throw new Error("Failed to delete game");
                          navigate("/games");
                        } catch (err) {
                          alert(err.message);
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    title="Delete Game"
                  >
                    <Trash size={18} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Media */}
          <div className="space-y-6">
            {/* Game Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                src={game.image || "/api/placeholder/800/600"}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>

            {/* YouTube Video */}
            {videoId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Game Trailer"
                    className="w-full h-full rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Game Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text mb-4">
                {game.title}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(game.rating)}
                </div>
                <span className="text-gray-400">({game.rating}/5)</span>
              </div>
            </motion.div>

            {/* Game Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Gamepad2 size={18} className="text-orange-400" />
                  <span className="text-sm text-gray-400">Genre</span>
                </div>
                <p className="text-white font-semibold">{game.genre}</p>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-orange-400" />
                  <span className="text-sm text-gray-400">Game Type</span>
                </div>
                <p className="text-white font-semibold">
                  {game.Type || "Single Player"}
                </p>
              </div>

              {game.releaseDate && (
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={18} className="text-orange-400" />
                    <span className="text-sm text-gray-400">Release Date</span>
                  </div>
                  <p className="text-white font-semibold">{game.releaseDate}</p>
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
            >
              <h3 className="text-xl font-bold text-orange-400 mb-3">
                Description
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {game.description}
              </p>
            </motion.div>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Ready to Play?
                  </h3>
                  <p className="text-orange-100">
                    Download now and start your adventure!
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>

            {/* Additional Info */}
            {(game.systemRequirements || game.fileSize) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  Additional Info
                </h3>
                {game.fileSize && (
                  <div className="mb-3">
                    <span className="text-gray-400">File Size: </span>
                    <span className="text-white">{game.fileSize}</span>
                  </div>
                )}
                {game.systemRequirements && (
                  <div>
                    <span className="text-gray-400">System Requirements: </span>
                    <span className="text-white">
                      {game.systemRequirements}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {showEditModal && (
        <AddGameForm
          game={game}
          onClose={() => setShowEditModal(false)}
          onSubmit={async (updatedData) => {
            try {
              const res = await fetch(
                `http://localhost:5000/api/games/${game._id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...updatedData,
                    rating: Number(updatedData.rating),
                  }),
                }
              );
              const updatedGame = await res.json();
              setGame(updatedGame);
              setShowEditModal(false);
            } catch (err) {
              console.error("Failed to update game:", err.message);
              alert("Something went wrong while updating the game.");
            }
          }}
        />
      )}
    </div>
  );
};

export default GameDetailPage;
