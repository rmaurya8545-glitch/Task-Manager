import { useState, useEffect } from "react";
import { STATUS } from "../constants.js";
import Column from "./Column.jsx";

export default function BoardPage({ searchQuery = "", priorityFilter = "all", userId }) {
  const [tasks, setTasks] = useState([]); // ab khaali — user khud add karega

  useEffect(() => {
    if(!userId) return;
    fetch(`http://localhost:8080/api/tasks?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => setTasks(data));
  },[userId]);

  function handleAddTask(data) {
    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify({ ...data, userId })
    })
    .then((res) => res.json())
    .then((newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });
  }
  function handleSaveEdit(id, data) {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then((res) =>res.json())
    .then((updatedTask) => {
      setTasks((prev) => prev.map((t) => (t.id == id ? updatedTask : t)));
    });
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method:"DELETE"
    }).then(() => {
      setTasks((prev) => prev.filter((t) => t.id !==id));
    });
  }
  function handleDrop(id, statusKey) {
    const task = tasks.find((t) => t.id === id);
    if(!task || task.status === statusKey) return;

    const updated = { ...task, status:statusKey };

    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(updated)
    })
    .then((res) => res.json())
    .then((savedTask) => {
      setTasks((prev) => prev.map((t) => (t.id ===id ? savedTask : t)));
    });
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


