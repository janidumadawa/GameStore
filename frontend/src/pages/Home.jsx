import { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import GameCarousel from "../components/GameCarousel.jsx";
import Footer from "../components/Footer.jsx";
import AuthButton from "../components/AuthButton";

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, -200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.3, 0.8]);
  const logoY = useTransform(scrollY, [0, 500], [0, -100]); // Logo parallax effect
  const logoOpacity = useTransform(scrollY, [0, 400], [1, 0]); // Logo fade out
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useLayoutEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-slate-900">
      <Navbar />
      <div className="fixed top-6 left-20 z-50">
        <img src="/logo.png" alt="GameVault Logo" className="h-30 w-auto" />
      </div>

      {/* login button */}
            <section>
              <AuthButton />
            </section>
            
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-[120%] bg-fixed bg-center bg-cover bg-[url('/hero1.jpg')] will-change-transform"
        />

        {/* Dynamic Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-orange-900/40 via-yellow-900/30 to-orange-900/40"
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            style={{ opacity: heroOpacity }}
            className="text-center max-w-4xl px-6"
          >
            

            {/* Large Logo with parallax and fade effects */}
            <motion.div
              style={{ y: logoY, opacity: logoOpacity }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4"
            >
              <img
                src="/logo3.png"
                alt="GameVault Logo"
                className="h-62 w-auto mx-auto" // Adjust size as needed (h-32 = 128px)
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            ></motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg"
            >
              <span className="relative">
                {/* Main gradient text */}
                <span
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 
                    bg-clip-text text-transparent 
                    bg-[length:200%_auto] animate-gradient-shine"
                >
                  Welcome to GameVault
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 
                           text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-orange-400 
                           transform hover:scale-105 transition-all duration-200 shadow-lg"
                onClick={() => {navigate("/games")}}
              >
                Browse Games
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-orange-400 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="h-screen bg-slate-900">
        <GameCarousel />
      </section>
    </div>
  );
};

export default Home;
