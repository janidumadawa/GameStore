// File: backend/models/News.js
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: false},
});

export default mongoose.model("News", newsSchema);