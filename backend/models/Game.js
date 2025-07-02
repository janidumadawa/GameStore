//D:\visual studio program\Game Store\backend\models\Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  image: { type: String },
  video: { type: String },
  rating: { type: Number, required: true },
  type: { type: String, required: true },
  downloadLink: { type: String, required: true },
}, {
  timestamps: true });

export default mongoose.model('Game', gameSchema);
