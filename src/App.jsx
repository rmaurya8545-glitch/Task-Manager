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
  const [currentUser, setCurrentUser] = useState(() => {
    try{
      return JSON.parse(localStorage.getItem("kanban-user"));
    }catch{
      return null;
    }
  });
  const isLoggedIn = currentUser !== null;
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

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

  function handleGetStarted() {
    if (isLoggedIn) {
      navigate("app");
    } else {
      navigate("login");
    }
  }

  function handleLogout(){
    localStorage.removeItem("kanban-user");
    setCurrentUser(null);
    setSearchQuery("");
    setPriorityFilter("all");
    navigate("hero");
  }
  function handleLoginSuccess(user){
    const safeUser = { id:user.id, name:user.name, email:user.email };
    localStorage.setItem("kanban-user", JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    navigate("app");
  }

  return (
    <div>
      <Navbar
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        page={page}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {page === "hero" && (
        <HeroPage onGetStarted={handleGetStarted} onLogin={() => navigate("login")} />
      )}
      {page === "app" && (
        <BoardPage searchQuery={searchQuery} priorityFilter={priorityFilter} userId={currentUser?.id} />
      )}
      {page === "about" && <AboutPage onTryBoard={handleGetStarted} />}
      {page === "login" && ( 
        <LoginPage
          onNavigate={navigate}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {page === "register" && <RegisterPage onNavigate={navigate} />}

      <Footer />
    </div>
  );
}
