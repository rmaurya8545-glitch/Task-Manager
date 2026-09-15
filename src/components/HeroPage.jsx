export default function HeroPage({ onGetStarted, onLogin }) {
  return (
    <div className="flex flex-col items-center gap-10 px-8 py-6 max-w-3xl mx-auto text-center">
      <div className="flex-1 flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <h1 className="font-bold text-3xl sm:text-5xl leading-tight dark:text-white">
            Organize your work, <span className="text-sky-600">one task</span> at a time.
          </h1>
          <button
            className="bg-sky-600 hover:bg-sky-700 hover:scale-105 transition-all text-white font-semibold px-6 py-2.5 rounded-lg whitespace-nowrap"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 text-base">
          A simple visual board to plan, track, and finish your tasks — move
          work through To Do, In Progress, and Done.
        </p>
        <button
          className="bg-sky-600 hover:bg-sky-700 hover:scale-105 transition-all text-white font-semibold px-6 py-3 rounded-lg"
          onClick={onGetStarted}
        >
          Get Started →
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="flex gap-3">
            <div className="flex-1 bg-orange-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-2">TO DO</p>
              <div className="h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mb-2"></div>
              <div className="h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mb-2"></div>
            </div>
            <div className="flex-1 bg-sky-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-2">IN PROGRESS</p>
              <div className="h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mb-2"></div>
            </div>
            <div className="flex-1 bg-green-100 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-2">DONE</p>
              <div className="h-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}