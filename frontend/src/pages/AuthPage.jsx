import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  GamepadIcon,
  Sparkles,
  Shield,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { x: isLogin ? -50 : 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: { x: isLogin ? 50 : -50, opacity: 0 },
  };

  useEffect(() => {
    setError("");
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const url = `http://localhost:5000/api/auth/${
      isLogin ? "login" : "register"
    }`;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        login(data.user);
        navigate("/");
      } else {
        alert("Registered! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    icon: Icon,
    type,
    name,
    placeholder,
    value,
    onChange,
    required = false,
  }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      <div className="relative">
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-400 transition-colors duration-300"
          size={20}
        />
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 hover:border-slate-600/70"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 text-sm bg-slate-800/70 border border-slate-700 text-white rounded-lg hover:bg-slate-700 transition"
      >
        <ArrowLeft size={16} /> Home
      </button>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Logo/Brand section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
            <img
              src="/logo.png"
              alt="GameVault Logo"
              className="w-40 h-40 object-cover"
            />
          </div>
          <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-white via-orange-300 to-yellow-400 bg-clip-text mb-2">
            GameVault
          </h1>
          <p className="text-gray-400">
            {isLogin ? "Welcome back, gamer!" : "Join the gaming revolution!"}
          </p>
        </motion.div>

        {/* Main form container */}
        <div className="relative">
          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full animate-shine"></div>

          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-2xl opacity-50 blur-sm"></div>

          <div className="relative bg-slate-800/80 backdrop-blur-xl p-10 rounded-2xl max-w-xl w-[500px] min-h-[400px] border border-slate-700/50 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Form header with icon */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-3">
                    {isLogin ? (
                      <Shield className="text-orange-400" size={24} />
                    ) : (
                      <Sparkles className="text-yellow-400" size={24} />
                    )}
                    <h2 className="text-2xl font-bold text-white">
                      {isLogin ? "Sign In" : "Create Account"}
                    </h2>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-5">
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InputField
                        icon={User}
                        type="text"
                        name="username"
                        placeholder="Choose your username"
                        value={formData.username}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </motion.div>
                  )}

                  <InputField
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    icon={Lock}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                      <p className="text-red-400 text-sm text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-xl hover:from-orange-400 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <GamepadIcon size={18} />
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Toggle button */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative">
                      {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                      <span className="text-orange-400 font-semibold group-hover:text-yellow-400 transition-colors duration-300">
                        {isLogin ? "Sign Up" : "Sign In"}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {/* //this is line 345 adn after that line 346 */}
      <style>
        {`
    @keyframes shine {
      0% {
        transform: translateX(-100%) skewX(-12deg);
      }
      100% {
        transform: translateX(200%) skewX(-12deg);
      }
    }

    @keyframes spin-slow {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .animate-shine {
      animation: shine 3s infinite;
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
  `}
      </style>
    </div>
  );
};

export default AuthPage;
