// File: frontend/src/pages/News.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const NewsPage = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news");

        // Ensure we always have an array, even if response.data is null/undefined
        const data = Array.isArray(response?.data) ? response.data : [];

        setArticles(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
        toast.error("Failed to load news");
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-orange-400 text-xl">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-24"
        >
          <h1 className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text mb-4">
            News & Updates
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements, releases, and industry
            news
          </p>
        </motion.div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/news/add")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              <Plus size={18} /> Add News
            </button>
          </div>
        )}

        {/* News Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No news articles found</p>
            {isAdmin && (
              <button
                onClick={() => navigate("/news/add")}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors mx-auto"
              >
                <Plus size={18} /> Create Your First News Article
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => {
              const formattedDate = new Date(article.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );

              return (
                <motion.div
                  key={article._id || index} // Fallback to index if _id is missing
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/news/${article._id}`)}
                >
                  <div className="h-full bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-orange-500/50 transition-all duration-300">

                  {article.image && (
                        <img
                          src={article.image}
                          alt={article.title || "News Image"}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                    {/* Article Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />2 min read
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                        {article.title || "Untitled Article"}
                      </h3>

                      

                      <p className="text-gray-400 mb-5 line-clamp-3">
                        {article.description || "No description available"}
                      </p>

                      <button className="flex items-center gap-1 text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                        Read more{" "}
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
