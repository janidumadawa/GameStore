// File: frontend/src/components/AddEditNews.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchNews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/news/${id}`
          );
          setFormData({
            title: response.data.title || "",
            description: response.data.description || "",
            image: response.data.image || "",
          });
        } catch (err) {
          toast.error("Failed to load news for editing");
          console.error(err);
          navigate("/news");
        }
      };
      fetchNews();
    }
  }, [id, isEditMode, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditMode) {
      await axios.put(`http://localhost:5000/api/news/${id}`, formData);
        toast.success("News updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/news", formData);
        toast.success("News created successfully");
      }
      navigate("/news");
    } catch (err) {
      toast.error(
        isEditMode ? "Failed to update news" : "Failed to create news"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/news")}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-400 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to News
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-xl p-6 md:p-8 shadow-xl border border-slate-700"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEditMode ? "Edit News Article" : "Add New Article"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-slate-700 border ${
                  errors.title ? "border-red-500" : "border-slate-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
                placeholder="Enter news title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className={`w-full px-4 py-2 bg-slate-700 border ${
                  errors.description ? "border-red-500" : "border-slate-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white`}
                placeholder="Enter news content"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Image URL (optional)
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddEditNews;
