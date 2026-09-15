export default function Navbar({ onNavigate, theme, onToggleTheme }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-4 
    border-b bg-white 
    dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-20">
      <h1
        className="font-bold text-3xl sm:text-2xl cursor-pointer dark:text-white"
        onClick={() => onNavigate("hero")}
      >
        Kanban<span className="text-sky-600">Board</span>
      </h1>

      <div className="flex items-center gap-2">
        <button className="nav-pill" onClick={() => onNavigate("hero")}>
          Home
        </button>
        <button className="nav-pill" onClick={() => onNavigate("about")}>
          About
        </button>
        <button className="nav-pill" onClick={onToggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}