const PREVIEW = [
  {
    label: "TO DO",
    dot: "bg-orange-400",
    bg: "bg-orange-50 dark:bg-gray-900/40",
    tasks: [
      { title: "Design login page", border: "border-red-400", due: "12 Nov", who: "R" },
      { title: "Write project report", border: "border-amber-400", due: "15 Nov", who: "A" }
    ]
  },
  {
    label: "IN PROGRESS",
    dot: "bg-sky-400",
    bg: "bg-sky-50 dark:bg-gray-900/40",
    tasks: [{ title: "Build REST API", border: "border-red-400", due: "10 Nov", who: "R" }]
  },
  {
    label: "DONE",
    dot: "bg-green-400",
    bg: "bg-green-50 dark:bg-gray-900/40",
    tasks: [{ title: "Project synopsis", border: "border-green-400", due: "02 Nov", who: "R", done: true }]
  }
];

const HIGHLIGHTS = [
  { icon: "🖱️", title: "Drag, drop, done", desc: "Move work across the board in one gesture, or one tap on mobile." },
  { icon: "🔐", title: "Your own private board", desc: "Log in and see only your tasks, saved safely in the cloud." },
  { icon: "🌓", title: "Light or dark, your call", desc: "A clean layout that looks right on any screen and any theme." }
];

export default function HeroPage({ onGetStarted, onLearnMore }) {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10">
      {/* Hero */}
      <div className="text-center flex flex-col items-center">
        <span className="text-xs font-semibold text-sky-600 bg-sky-50 dark:bg-sky-900/30 dark:text-sky-300 rounded-full px-3 py-1 mb-5">
          Simple · Visual · Yours
        </span>
        <h1 className="font-bold text-4xl sm:text-6xl leading-tight mb-6 dark:text-white">
          Organize your work,
          <br />
          <span className="text-sky-600">one task</span> at a time.
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mb-8 text-base sm:text-lg">
          A simple visual board to plan, track, and finish your tasks. Move
          work through To Do, In Progress, and Done.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            className="bg-sky-600 hover:bg-sky-700 hover:scale-105 transition-all text-white font-semibold px-8 py-3.5 rounded-lg text-lg"
            onClick={onGetStarted}
          >
            Get Started →
          </button>
          {onLearnMore && (
            <button
              className="border border-gray-300 dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold px-8 py-3.5 rounded-lg text-lg"
              onClick={onLearnMore}
            >
              Learn more
            </button>
          )}
        </div>
      </div>

      {/* Board preview */}
      <div className="mt-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PREVIEW.map((col) => (
            <div key={col.label} className={`${col.bg} rounded-xl p-3`}>
              <div className="flex items-center gap-1.5 mb-3">
                <span className={`w-2 h-2 rounded-full ${col.dot}`}></span>
                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300">{col.label}</p>
                <span className="ml-auto text-[11px] text-gray-500 dark:text-gray-400">{col.tasks.length}</span>
              </div>
              {col.tasks.map((t) => (
                <div
                  key={t.title}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-2.5 mb-2 last:mb-0 shadow-sm border-l-4 ${t.border} ${t.done ? "opacity-70" : ""}`}
                >
                  <p className={`text-xs font-semibold mb-1.5 dark:text-white ${t.done ? "line-through" : ""}`}>
                    {t.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                    <span>📅 {t.due}</span>
                    <span className="w-4 h-4 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center">
                      {t.who}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.title}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-3">{h.icon}</div>
            <h3 className="font-semibold text-sm mb-1.5 dark:text-white">{h.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="text-center mt-14 bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700 rounded-xl px-6 py-10">
        <h3 className="font-bold text-xl sm:text-2xl mb-2 dark:text-white">Ready to get organized?</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Create your free account and add your first task in seconds.
        </p>
        <button
          className="bg-sky-600 hover:bg-sky-700 hover:scale-105 transition-all text-white font-semibold px-6 py-3 rounded-lg"
          onClick={onGetStarted}
        >
          Get Started →
        </button>
      </div>
    </div>
  );
}