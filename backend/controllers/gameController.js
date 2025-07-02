//D:\visual studio program\Game Store\backend\controllers\gameController.js
import Game from "../models/Game.js";

// GET all games
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single game by ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//add a game
export const addGame = async (req, res) => {
  const { title, description, genre, image, rating, type, downloadLink } = req.body;

  if (!title || !description || !genre || !rating || !type || !downloadLink) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    const newGame = new Game({
      title,
      description,
      genre,
      image: image || "",
      rating,
      type,
      downloadLink,
      video: req.body.video || "",
    });
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    console.error("Add game error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};


// PUT update a game
export const updateGame = async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a game
export const deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
