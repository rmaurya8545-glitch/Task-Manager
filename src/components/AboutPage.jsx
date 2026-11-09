const STEPS = [
  { title: "Create an account", desc: "Register with your email. Your password is stored encrypted." },
  { title: "Add your tasks", desc: "Give each task a title, priority, assignee and due date, right on the board." },
  { title: "Move them forward", desc: "Drag a card or tap a move button as work goes from To Do to Done." }
];

const FEATURES = [
  { icon: "🔐", title: "Your own board", desc: "Log in and see only your tasks. Login is remembered after a refresh." },
  { icon: "🖱️", title: "Drag & Drop", desc: "Move tasks between columns by dragging, or with move buttons on mobile." },
  { icon: "✏️", title: "Inline Editing", desc: "Add and edit tasks right on the board, with no popups." },
  { icon: "🏷️", title: "Priority Tags", desc: "Mark tasks Low, Medium or High, shown with a colour on every card." },
  { icon: "👤", title: "Assignee & Due Date", desc: "Keep track of who is doing what, and by when." },
  { icon: "🔍", title: "Search & Filter", desc: "Find tasks by title and filter by priority from the navbar." },
  { icon: "🌓", title: "Light & Dark Mode", desc: "Switch themes anytime. Your choice is remembered." },
  { icon: "📱", title: "Works on Any Screen", desc: "Responsive layout, with loading spinners on slow connections." }
];

const STACK = [
  { layer: "Frontend", items: ["React", "JavaScript", "Tailwind CSS"] },
  { layer: "Backend", items: ["Java", "Spring Boot", "REST APIs"] },
  { layer: "Database", items: ["MySQL"] },
  { layer: "Hosting", items: ["Vercel", "Render"] }
];

export default function AboutPage({ onTryBoard }) {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
      {/* Intro */}
      <span className="inline-block text-xs font-semibold text-sky-600 bg-sky-50 dark:bg-sky-900/30 dark:text-sky-300 rounded-full px-3 py-1 mb-4">
        About the project
      </span>
      <h2 className="font-bold text-3xl sm:text-4xl leading-tight mb-4 dark:text-white">
        Built to keep your work visible.
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-12">
        Kanban Task Board is a full-stack web app for planning and tracking tasks.
        Instead of scattered notes and to-do lists, your work lives on one board
        with three clear stages: To Do, In Progress and Done.
      </p>

      {/* How it works */}
      <h3 className="font-bold text-lg mb-4 dark:text-white">How it works</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {STEPS.map((s, i) => (
          <div key={s.title} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-5">
            <div className="w-8 h-8 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center mb-3">
              {i + 1}
            </div>
            <h4 className="font-semibold text-sm mb-1.5 dark:text-white">{s.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <h3 className="font-bold text-lg mb-4 dark:text-white">Key features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-5 flex gap-3">
            <div className="text-2xl leading-none">{f.icon}</div>
            <div>
              <h4 className="font-semibold text-sm mb-1 dark:text-white">{f.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <h3 className="font-bold text-lg mb-4 dark:text-white">Built with</h3>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg divide-y dark:divide-gray-700 mb-12">
        {STACK.map((row) => (
          <div key={row.layer} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-4">
            <span className="w-24 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {row.layer}
            </span>
            <div className="flex flex-wrap gap-2">
              {row.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-semibold border dark:border-gray-600 dark:text-white rounded-full px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Developer */}
      <h3 className="font-bold text-lg mb-4 dark:text-white">The developer</h3>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-5 flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-full bg-sky-600 text-white text-lg font-bold flex items-center justify-center shrink-0">
          R
        </div>
        <div>
          <p className="font-semibold text-sm dark:text-white">Roshani Maurya</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            BCA (Computer Science), Microtek College of Management and Technology,
            Mahatma Gandhi Kashi Vidyapeeth, Varanasi. Built as a college minor project.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700 rounded-xl px-6 py-10">
        <h3 className="font-bold text-xl mb-2 dark:text-white">Ready to organize your work?</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Open the board and add your first task in seconds.
        </p>
        <button
          className="bg-sky-600 hover:bg-sky-700 hover:scale-105 transition-all text-white font-semibold px-6 py-3 rounded-lg"
          onClick={onTryBoard}
        >
          Try the Board →
        </button>
      </div>
    </div>
  );
}