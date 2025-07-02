// File: backend/controllers/newsController.js
import News from "../models/News.js";

// Get all news
export const getAllNews = async (req, res) => {
  try {
    const newsItems = await News.find().sort({ createdAt: -1 });
    res.json(newsItems);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single news by ID
export const getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ error: "News not found" });
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// createNews
export const createNews = async (req, res) => {
  try {
    const { title, description, image} = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newsItem = new News({
      title,
      description,
      date: new Date(),
        image: image || "", // Optional image field
    });

    await newsItem.save();
    res.status(201).json(newsItem);
  }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Update news
export const updateNews = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { title, description, date: new Date(), image: image || "" }, // Optional image field
      { new: true }
    );

    if (!newsItem) return res.status(404).json({ error: "News not found" });
    res.json(newsItem);
  }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Delete news
export const deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) return res.status(404).json({ error: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

