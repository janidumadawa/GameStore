import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const GameRequestPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gameTitle: "",
    platform: "",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSubmitted(false);

    // Make sure you have these in your .env file as REACT_APP_ prefixed variables
    const serviceID = "service_08l7zlh";
    const templateID = "template_dd0e2w8";
    const userID = "jUHXCXFnJyGz3vMJh";

    if (!serviceID || !templateID || !userID) {
      setError("Email service is not configured properly.");
      setSending(false);
      return;
    }

    try {
      // Prepare parameters to send to email template
      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        game_title: formData.gameTitle.trim(),
        platform: formData.platform.trim(),
        reason: formData.reason.trim(),
      };

      await emailjs.send(serviceID, templateID, templateParams, userID);

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        gameTitle: "",
        platform: "",
        reason: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send request. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-24"
        >
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text mb-2">
            Request a Game
          </h1>
          <p className="text-gray-400">
            Can’t find a game you love? Let us know, and we’ll try to add it!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700 space-y-6"
        >
          {submitted && (
            <div className="text-green-400 font-medium text-center">
              ✅ Your request has been sent!
            </div>
          )}

          {error && (
            <div className="text-red-500 font-medium text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={sending}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={sending}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Game Title</label>
            <input
              type="text"
              name="gameTitle"
              value={formData.gameTitle}
              onChange={handleChange}
              required
              disabled={sending}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
              disabled={sending}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
            >
              <option value="">Select a platform</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Xbox">Xbox</option>
              <option value="Switch">Switch</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">
              Why do you want this game?
            </label>
            <textarea
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={sending}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:from-orange-400 hover:to-yellow-300 transition-all duration-300"
          >
            <Send size={18} />
            {sending ? "Sending..." : "Submit Request"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default GameRequestPage;
