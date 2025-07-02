import { useState, useEffect, useRef } from "react";
import { FaUpload, FaYoutube, FaStar, FaTimes } from "react-icons/fa";

const AddGameForm = ({ game, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    image: "",
    video: "",
    type: "",
    rating: 1,
    description: "",
    imageFile: null,
    imagePreview: "",
    downloadLink: "",
  });

  const submittedRef = useRef(false);

  const [hoverRating, setHoverRating] = useState(0);
  const [typeSearch, setTypeSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const genres = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Puzzle",
    "Horror",
    "FPS",
    "MMO",
    "Platformer",
  ];

  const gameTypes = [
    "Single Player",
    "Multiplayer",
    "Co-op",
    "Online Multiplayer",
    "Local Multiplayer",
    "Battle Royale",
    "Open World",
    "Sandbox",
    "Survival",
    "Roguelike",
    "VR",
  ];

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || "",
        genre: game.genre || "",
        image: game.image || "",
        video: game.video || "",
        type: game.type || "",
        rating: game.rating || 1,
        description: game.description || "",
        downloadLink: game.downloadLink || "",
        imageFile: null,
        imagePreview: "",
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isUploading || submittedRef.current) return;
  setIsUploading(true);
  submittedRef.current = true;

  const requiredFields = [
    "title",
    "description",
    "genre",
    "rating",
    "type",
    "downloadLink",
  ];

  for (const field of requiredFields) {
    if (
      !formData[field] ||
      (typeof formData[field] === "string" && formData[field].trim() === "")
    ) {
      alert(`Please fill the required field: ${field}`);
      setIsUploading(false);
      submittedRef.current = false;
      return;
    }
  }

  try {
    // Only pass the form data to the parent
    const submitData = {
      ...formData,
      rating: Number(formData.rating),
    };

    delete submitData.imageFile;
    delete submitData.imagePreview;

    await onSubmit(submitData); // ✅ Let the parent component handle fetch
    onClose(); // Close the modal after submit

    setFormData({
      title: "",
      genre: "",
      image: "",
      video: "",
      type: "",
      rating: 1,
      description: "",
      imageFile: null,
      imagePreview: "",
      downloadLink: "",
    });
  } catch (err) {
    console.error("Error submitting game:", err.message);
    alert(`Something went wrong while submitting the game: ${err.message}`);
  } finally {
    setIsUploading(false);
    submittedRef.current = false;
  }
};


  const filteredTypes = gameTypes.filter((type) =>
    type.toLowerCase().includes(typeSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl w-full max-w-2xl border border-slate-700 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {game ? "Edit Game" : "Add New Game"}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Game Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                placeholder="Enter game title"
              />
            </div>

            {/* Genre Dropdown */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Genre*
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none appearance-none transition"
              >
                <option value="">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload Section */}

            {/* Image URL */}
            <div className="flex-1">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                placeholder="Paste image URL"
                disabled={!!formData.imagePreview}
              />
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                YouTube Video URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <FaYoutube className="text-xl" />
                </div>
                <input
                  type="url"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                  placeholder="https://youtube.com/embed/..."
                />
              </div>
            </div>

            {/* Type with Searchable Dropdown */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Game Type*
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={typeSearch}
                  onChange={(e) => setTypeSearch(e.target.value)}
                  onFocus={() => setTypeSearch("")}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                  placeholder="Search game type..."
                />
                {typeSearch && (
                  <div className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredTypes.length > 0 ? (
                      filteredTypes.map((type) => (
                        <div
                          key={type}
                          className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-slate-300"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, type }));
                            setTypeSearch("");
                          }}
                        >
                          {type}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-slate-400">
                        No matching types
                      </div>
                    )}
                  </div>
                )}
                <input
                  type="hidden"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
                {formData.type && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-slate-300">Selected:</span>
                    <span className="bg-slate-700 px-3 py-1 rounded-full text-sm text-orange-400">
                      {formData.type}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Rating (1-5)
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className="text-2xl mr-1 focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: star }))
                    }
                  >
                    <FaStar
                      className={
                        star <= (hoverRating || formData.rating)
                          ? "text-yellow-400"
                          : "text-slate-500"
                      }
                    />
                  </button>
                ))}
                <span className="ml-2 text-slate-400">
                  {formData.rating || "Not rated"}
                </span>
              </div>
              <input
                type="hidden"
                name="rating"
                value={formData.rating}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Description*
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white border border-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                placeholder="Enter detailed game description..."
              />
            </div>

            {/* Download Link */}
            <div className="mb-4">
              <label htmlFor="downloadLink" className="block text-white mb-1">
                Download Link
              </label>
              <input
                type="text"
                id="downloadLink"
                name="downloadLink"
                value={formData.downloadLink}
                onChange={handleChange}
                placeholder="https://your-download-url.com"
                className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
             <button
  type="submit"
  disabled={isUploading}
  className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition disabled:opacity-50"
>
  {isUploading ? "Submitting..." : game ? "Update Game" : "Add Game"}
</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGameForm;
