import { useState } from "react";
import { STATUS } from "../constants.js";
import Column from "./Column.jsx";

let nextId = 1;

export default function BoardPage() {
  const [tasks, setTasks] = useState([]); // ab khaali — user khud add karega

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

