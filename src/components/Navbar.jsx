export default function Navbar({
  onNavigate,
  theme,
  onToggleTheme,
  page,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  isLoggedIn,
  onLogout
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-20">
      <h1
        className="font-bold text-xl cursor-pointer dark:text-white"
        onClick={() => onNavigate("hero")}
      >
        Kanban<span className="text-sky-600">Board</span>
      </h1>

      {page === "app" && (
        <div className="flex items-center gap-2 order-3 sm:order-none w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              className="border rounded-full pl-7 pr-3 py-1.5 text-sm w-full sm:w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <select
            className="border rounded-full px-3 py-1.5 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button className="nav-pill" onClick={() => onNavigate("hero")}>
          Home
        </button>
        <button className="nav-pill" onClick={() => onNavigate("about")}>
          About
        </button>
        {isLoggedIn && (
        <button className="nav-pill text-red-500" onClick={onLogout}>
          Logout
        </button>
        )}
        <button className="nav-pill" onClick={onToggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}