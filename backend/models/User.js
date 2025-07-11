// D:\visual studio program\Game Store\backend\models\User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text
  role: { type: String, enum: ["user", "admin"], default: "user" }
});

export default mongoose.model("User", userSchema);
