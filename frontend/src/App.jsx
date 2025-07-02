// File: frontend/src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Navbar from "./components/Navbar";
import SupportPage from "./pages/Support";
import GameRequestPage from "./pages/Request";
import AboutUsPage from "./pages/Aboutus";
import AuthPage from "./pages/AuthPage";
import AuthButton from "./components/AuthButton.jsx";
import { UserProvider, useUser } from "./context/UserContext";
import GameDetailPage from "./pages/GameDetailPage";
import Footer from "./components/Footer.jsx";
import AddEditNews from "./components/AddEditNews.jsx";
import NewsDetailPage from "./pages/newsDetailPage.jsx";
import NewsPage from "./pages/News.jsx";


const AppRoutes = () => {
  const location = useLocation();
  const { currentUser } = useUser();
  const isAdmin = currentUser?.role === "admin";

  const hideNavbar = ["/auth"];

  return (
    <>
      {!hideNavbar.includes(location.pathname) && (
        <>
          <Navbar />
          <AuthButton />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games isAdmin={isAdmin} />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/request" element={<GameRequestPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/game/:id" element={<GameDetailPage isAdmin={isAdmin} />} />

        <Route path="/news" element={<NewsPage isAdmin={isAdmin} />} />
        <Route path="/news/:id" element={<NewsDetailPage isAdmin={isAdmin} />} />

        {isAdmin && (
          <>
            <Route path="/news/add" element={<AddEditNews />} />
            <Route path="/news/edit/:id" element={<AddEditNews />} />
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
