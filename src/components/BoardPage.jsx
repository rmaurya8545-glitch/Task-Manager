// import { useState, useEffect } from "react";
// import { STATUS } from "../constants.js";
// import Column from "./Column.jsx";
// import { API_URL } from "../config.js";

// export default function BoardPage({ searchQuery = "", priorityFilter = "all", userId }) {
//   const [tasks, setTasks] = useState([]); // ab khaali — user khud add karega

//   useEffect(() => {
//     if(!userId) return;
//     fetch(`${API_URL}/api/tasks?userId=${userId}`)
//     .then((res) => res.json())
//     .then((data) => setTasks(data));
//   },[userId]);

//   function handleAddTask(data) {
//     fetch(`${API_URL}/api/tasks`, {
//       method: "POST",
//       headers: {"Content-Type":"application/json"},
//       body:JSON.stringify({ ...data, userId })
//     })
//     .then((res) => res.json())
//     .then((newTask) => {
//       setTasks((prev) => [...prev, newTask]);
//     });
//   }
//   function handleSaveEdit(id, data) {
//     fetch(`${API_URL}/api/tasks/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     })
//     .then((res) =>res.json())
//     .then((updatedTask) => {
//       setTasks((prev) => prev.map((t) => (t.id == id ? updatedTask : t)));
//     });
//   }

//   function handleDelete(id) {
//     fetch(`${API_URL}/api/tasks/${id}`, {
//       method:"DELETE"
//     }).then(() => {
//       setTasks((prev) => prev.filter((t) => t.id !==id));
//     });
//   }
//   function handleDrop(id, statusKey) {
//     const task = tasks.find((t) => t.id === id);
//     if(!task || task.status === statusKey) return;

//     const updated = { ...task, status:statusKey };

//     fetch(`${API_URL}/api/tasks/${id}`, {
//       method:"PUT",
//       headers: { "Content-Type": "application/json" },
//       body:JSON.stringify(updated)
//     })
//     .then((res) => res.json())
//     .then((savedTask) => {
//       setTasks((prev) => prev.map((t) => (t.id ===id ? savedTask : t)));
//     });
//   }
//   const filteredTasks = tasks.filter((t) => {
//   const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
//   const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
//   return matchesSearch && matchesPriority;
//   });

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-6 max-w-6xl mx-auto">
//       {STATUS.map((column) => (
//         <Column
//           key={column.key}
//           column={column}
//           tasks={filteredTasks.filter((t) => t.status === column.key)}
//           onAddTask={handleAddTask}
//           onSaveEdit={handleSaveEdit}
//           onDelete={handleDelete}
//           onDrop={handleDrop}
//         />
//       ))}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { API_URL } from "../config.js";
import { STATUS } from "../constants.js";
import Column from "./Column.jsx";
import Spinner from "./Spinner.jsx";
import useSlowHint from "../hooks/useSlowHint.js";

export default function BoardPage({ searchQuery = "", priorityFilter = "all", userId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [actionError, setActionError] = useState("");
  const [busyIds, setBusyIds] = useState([]);
  const slow = useSlowHint(loading);

  function loadTasks() {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(false);
    fetch(`${API_URL}/api/tasks?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("load");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadTasks();
  }, [userId]);

  // card-level spinner for delete / move
  function withBusy(id, request) {
    setActionError("");
    setBusyIds((prev) => [...prev, id]);
    return request()
      .catch(() =>
        setActionError("Something went wrong. Please check your connection and try again.")
      )
      .finally(() => setBusyIds((prev) => prev.filter((x) => x !== id)));
  }

  // add and edit return a promise, the form shows its own spinner
  function handleAddTask(data) {
    return fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userId })
    })
      .then((res) => {
        if (!res.ok) throw new Error("add");
        return res.json();
      })
      .then((newTask) => setTasks((prev) => [...prev, newTask]));
  }

  function handleSaveEdit(id, data) {
    return fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) throw new Error("edit");
        return res.json();
      })
      .then((updated) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      );
  }

  function handleDelete(id) {
    return withBusy(id, () =>
      fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("delete");
        setTasks((prev) => prev.filter((t) => t.id !== id));
      })
    );
  }

  function handleDrop(id, statusKey) {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === statusKey) return;

    withBusy(id, () =>
      fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, status: statusKey })
      })
        .then((res) => {
          if (!res.ok) throw new Error("move");
          return res.json();
        })
        .then((saved) =>
          setTasks((prev) => prev.map((t) => (t.id === id ? saved : t)))
        )
    );
  }

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 dark:text-gray-400">
        <Spinner className="w-8 h-8 text-sky-600" />
        <p className="mt-3 text-sm">Loading your tasks...</p>
        {slow && (
          <p className="mt-1 text-xs">Server is waking up, this can take up to a minute…</p>
        )}
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <p className="text-sm text-red-600 dark:text-red-400 mb-3">
          Could not load your tasks. Please check your internet connection.
        </p>
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          onClick={loadTasks}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {actionError && (
        <p className="max-w-6xl mx-auto mt-4 mx-6 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 rounded px-3 py-2">
          {actionError}
        </p>
      )}
      <div className="flex flex-col md:flex-row gap-4 p-6 max-w-6xl mx-auto">
        {STATUS.map((column) => (
          <Column
            key={column.key}
            column={column}
            tasks={filteredTasks.filter((t) => t.status === column.key)}
            busyIds={busyIds}
            onAddTask={handleAddTask}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}