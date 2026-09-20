import { useState, useEffect } from "react";
import { STATUS } from "../constants.js";
import Column from "./Column.jsx";

let nextId = 1;

export default function BoardPage({ searchQuery = "", priorityFilter = "all" }) {
  const [tasks, setTasks] = useState([]); // ab khaali — user khud add karega

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
    .then((res) => res.json())
    .then((data) => setTasks(data));
  },[]);

  function handleAddTask(data) {
    setTasks((prev) => [...prev, { id: nextId++, ...data }]);
  }
  function handleSaveEdit(id, data) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }
  function handleDrop(id, statusKey) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: statusKey } : t)));
  }
  const filteredTasks = tasks.filter((t) => {
  const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
  return matchesSearch && matchesPriority;
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 max-w-6xl mx-auto">
      {STATUS.map((column) => (
        <Column
          key={column.key}
          column={column}
          tasks={tasks.filter((t) => t.status === column.key)}
          onAddTask={handleAddTask}
          onSaveEdit={handleSaveEdit}
          onDelete={handleDelete}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}

