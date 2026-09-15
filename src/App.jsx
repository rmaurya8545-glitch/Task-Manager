import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HeroPage from "./components/HeroPage.jsx";
import BoardPage from "./components/BoardPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";

export default function App() {
  const [page, setPage] = useState("hero");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("kanban-theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("kanban-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function navigate(target) {
    setPage(target);
    window.scrollTo(0, 0);
  }

  return (
    <div className="overflow-x-hidden">
      <Navbar onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />

      {page === "hero" && <HeroPage onGetStarted={() => navigate("app")} onLogin={() => navigate("login")} />}
      

      
        {page === "app" && <BoardPage />}
        {page === "about" && <AboutPage onTryBoard={() => navigate("app")} />}
        {page === "login" && <LoginPage onNavigate={navigate} />}
        {page === "register" && <RegisterPage onNavigate={navigate} />}
      
      <Footer />
    </div>
  );
}