import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ChevronDown, User, Heart, LogOut } from "lucide-react";

const AuthButton = () => {
  const { currentUser, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed top-12 right-20 z-50">
      {currentUser ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-2 rounded-lg hover:from-slate-700 hover:to-slate-600 transform hover:scale-[1.02] transition-all duration-200 shadow-md border border-slate-600 hover:border-orange-400/30 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-slate-900 font-bold text-sm shadow-inner">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>

              <span className="font-medium text-gray-200 group-hover:text-orange-300 transition-colors">
                {currentUser.username}
              </span>
            </div>

            <ChevronDown
              size={18}
              className={`text-orange-400 group-hover:text-yellow-300 transition-all duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-200">
              <div className="py-2">
                {/* Profile Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center text-slate-900 font-bold">
                      {currentUser.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {currentUser.username}
                      </p>
                      <p className="text-gray-400 text-xs capitalize">
                        {currentUser.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-orange-300 transition-all duration-200 group"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User
                      size={18}
                      className="text-orange-400 group-hover:scale-110 transition-transform"
                    />
                    <span className="font-medium">Profile</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-orange-300 transition-all duration-200 group"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Heart
                      size={18}
                      className="text-orange-400 group-hover:scale-110 transition-transform"
                    />
                    <span className="font-medium">Wishlist</span>
                  </Link>

                  <div className="border-t border-slate-600 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        window.location.href = "/";
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 group"
                    >
                      <LogOut
                        size={18}
                        className="text-red-400 group-hover:scale-110 transition-transform"
                      />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/auth">
          <button
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500
              text-slate-900 font-semibold rounded-xl hover:from-orange-400 hover:to-yellow-400
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
              border border-orange-400/30 hover:border-orange-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
