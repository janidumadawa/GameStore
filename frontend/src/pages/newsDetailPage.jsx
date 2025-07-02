// File: frontend/src/pages/newsDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const NewsDetailPage = ({ isAdmin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/news/${id}`
        );
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load news article");
        setLoading(false);
        console.error(err);
      }
    };

    fetchNews();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        await axios.delete(`http://localhost:5000/api/news/${id}`);
        toast.success("News deleted successfully");
        navigate("/news");
      } catch (err) {
        toast.error("Failed to delete news");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-orange-400 text-xl">Loading news article...</div>
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-orange-400 text-xl">News article not found</div>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pt-24">
        <button
          onClick={() => navigate("/news")}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-400 mb-8 transition-colors"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to News
        </button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-6 md:p-8 shadow-xl border border-slate-700"
        >
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Published on {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />2 min read
              </span>
            </div>

            {isAdmin && (
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => navigate(`/news/edit/${article._id}`)}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-md transition-colors"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md transition-colors"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </header>

          {/* Article Image */}
          {article.image && (
            <div className="mb-6">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 whitespace-pre-line">
              {article.description}
            </p>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-700">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("/news")}
                className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
              >
                <ArrowRight className="rotate-180" size={16} /> Back to News
              </button>
            </div>
          </footer>
        </motion.article>
      </div>
    </div>
  );
};

export default NewsDetailPage;
