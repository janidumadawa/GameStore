import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSubmitted(false);

    // const serviceID = process.env.REACT_APP_SERVICE_ID;
    // const templateID = process.env.REACT_APP_TEMPLATE_ID;
    // const userID = process.env.REACT_APP_USER_ID;

     const serviceID = "service_08l7zlh"
    const templateID = "template_3u7d8ck";
    const userID = "jUHXCXFnJyGz3vMJh";

    if (!serviceID || !templateID || !userID) {
      setError("Email service is not configured properly.");
      setSending(false);
      return;
    }

    try {
      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      await emailjs.send(serviceID, templateID, templateParams, userID);

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again later.");
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
            Contact Support
          </h1>
          <p className="text-gray-400">
            Need help? Send us a message and we’ll get back to you soon.
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
              ✅ Your message has been sent successfully!
            </div>
          )}

          {error && (
            <div className="text-red-500 font-medium text-center">{error}</div>
          )}

          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
              disabled={sending}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
              disabled={sending}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-orange-500 outline-none"
              disabled={sending}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:from-orange-400 hover:to-yellow-300 transition-all duration-300"
          >
            <Send size={18} />
            {sending ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default SupportPage;
