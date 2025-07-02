import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-24"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text mb-4">
            About Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the vision behind our game universe and the people who make
            it epic.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 p-6 md:p-10 rounded-2xl shadow-lg border border-slate-700 mb-10"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to build the ultimate platform for gamers to explore,
            discover, and enjoy the world of games. From casual players to
            hardcore enthusiasts, we strive to offer a rich collection of
            titles, powerful tools, and a welcoming community. We're passionate
            about technology, storytelling, and the joy of gaming.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 p-6 md:p-10 rounded-2xl shadow-lg border border-slate-700 mb-10"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-3">
            What We Value
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>🎮 New games and cracked games for every type of player</li>
            <li>⬇️ Simple and easy game downloads</li>
            <li>🚫 Ads-free</li>
            <li>
              🤝 Respect and support for developers and the gaming community
            </li>
            <li>
              🌟 Quality, safety, and reliability in all our game offerings
            </li>
          </ul>
        </motion.div>

        {/* Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 p-6 md:p-10 rounded-2xl shadow-lg border border-slate-700 mb-10"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
            Contact Us
          </h2>
          <div className="space-y-4 text-gray-300 max-w-md mx-auto text-center">
            <p className="flex items-center justify-center gap-3 text-lg">
              <FaPhone className="text-orange-400" /> +94 70 328 1428
            </p>
            <p className="flex items-center justify-center gap-3 text-lg">
              <FaEnvelope className="text-orange-400" />{" "}
              <a
                href="mailto:support@example.com"
                className="hover:underline text-gray-300"
              >
                janidumadawa00@gmail.com
              </a>
            </p>
            <div className="flex justify-center gap-6 text-gray-400">
              <a
                href="https://www.linkedin.com/in/janidu-madawa-082130215/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/janidumadawa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://web.facebook.com/janidumadawa0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Developer Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 p-6 md:p-10 rounded-2xl shadow-lg border border-slate-700 mb-10"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
            <Users size={20} /> Developer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-xl p-4 text-center shadow-md">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                <img
                  src="/me.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-semibold">Janidu Madawa</h3>
              <p className="text-sm text-gray-400 mb-4">
                Web Site Owner <br /> Full Stack Developer
              </p>

              <div className="flex justify-center gap-6 text-gray-400">
                <a
                  href="https://www.linkedin.com/in/janidu-madawa-082130215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/janidumadawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://web.facebook.com/janidumadawa0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;
