const FEATURES = [
  { icon: "🖱️", title: "Drag & Drop", desc: "Move tasks between columns by dragging." },
  { icon: "✏️", title: "Inline Editing", desc: "Add and edit tasks right on the board — no popups." },
  { icon: "🏷️", title: "Priority Tags", desc: "Mark tasks Low, Medium, or High." },
  { icon: "👤", title: "Assignee & Due Date", desc: "Keep track of who's doing what, and by when." }
];

const TECH = ["React", "JavaScript", "Tailwind CSS", "Java", "MySQL"];

export default function AboutPage({ onTryBoard }) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h2 className="font-bold text-2xl mb-3 dark:text-white">Built to keep your work visible.</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Kanban Task Board is a college minor project — a lightweight, visual way to plan and track tasks.
      </p>

      <h3 className="font-bold text-base mb-3 dark:text-white">Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
            <div className="text-xl mb-2">{f.icon}</div>
            <h4 className="font-semibold text-sm mb-1 dark:text-white">{f.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-base mb-3 dark:text-white">Built With</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {TECH.map((t) => (
          <span key={t} className="text-xs font-semibold border dark:border-gray-600 dark:text-white rounded-full px-3 py-1.5">{t}</span>
        ))}
      </div>

      <button className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg" onClick={onTryBoard}>
        Try the Board →
      </button>
    </div>
  );
}