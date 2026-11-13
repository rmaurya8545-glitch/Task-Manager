export default function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className="text-center px-6 py-3 border-t dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
          Kanban<span className="text-sky-600 font-semibold">Board</span> &middot; College minor project &middot; React, Java &amp; MySQL
        </p>
      </footer>
    );
  }

  return (
    <footer className="text-center px-6 py-4 sm:py-6 border-t dark:border-gray-700 mt-2">
      <div className="font-bold text-sm mb-1 dark:text-white">
        Kanban<span className="text-sky-600">Board</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
        College minor project &middot; React, Java &amp; MySQL
      </p>
    </footer>
  );
}