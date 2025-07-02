import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: "News", path: "/news" },
    { name: "Support", path: "/support" },
    { name: "Request", path: "/request" },
    { name: "About Us", path: "/about" },
  ];

  // Handle scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track mouse position for interactive effects
  const handleMouseMove = (e) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Ambient background glow */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-900/20 via-yellow-900/10 to-transparent pointer-events-none z-40" />

      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl
                   transition-all duration-700 ease-out ${
                     isVisible
                       ? "translate-y-0 opacity-100"
                       : "-translate-y-full opacity-0"
                   }`}
      >
        {/* Main navbar container with liquid glass effect */}
        <div className="relative group">
          {/* Liquid glass background layers */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 
                         backdrop-blur-xl border border-white/20 shadow-2xl"
          />

          {/* Animated border gradient */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30 
                         opacity-0  transition-opacity duration-500 blur-sm"
          />

          {/* Interactive mouse-follow gradient */}
          <div
            className="absolute inset-0 rounded-3xl opacity-30 transition-all duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                          rgba(234, 179, 8, 0.3) 0%, 
                          rgba(249, 115, 22, 0.2) 30%, 
                          transparent 70%)`,
            }}
          />

          {/* Main content - centered nav items */}
          <div className="relative px-8 py-4 flex justify-center items-center">
            {/* Navigation items with simple hover effect */}
            <ul className="flex items-center space-x-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="relative px-6 py-3 text-white/90 hover:text-white font-medium text-lg
                   flex items-center transition-all duration-300 rounded-2xl
                   hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 group"
                  >
                    <span className="relative">
                      {item.name}
                      <div className="absolute bottom-0 left-0 h-0.5 bg-orange-400 w-0 group-hover:w-full transition-all duration-300" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom glass reflection */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                         rounded-b-3xl opacity-60"
          />
        </div>

        {/* Liquid drip effect */}
        <div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 
                       bg-gradient-to-b from-white/10 to-transparent rounded-full blur-sm opacity-60"
        />
      </nav>
    </>
  );
};

export default Navbar;
