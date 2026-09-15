import { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import TaskForm from "./TaskForm.jsx";

export default function Column({ column, tasks, onAddTask, onSaveEdit, onDelete, onDrop }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  function handleAdd(data) {
    onAddTask(data);
    setShowAddForm(false);
  }

  function handleSave(id, data) {
    onSaveEdit(id, data);
    setEditingId(null);
  }

  function handleDragStart(e, taskId) {
    e.dataTransfer.setData("text/plain", String(taskId));
  }

  function handleDropHere(e) {
    e.preventDefault();
    setDragOver(false);
    const id = Number(e.dataTransfer.getData("text/plain"));
    onDrop(id, column.key);
  }

  return (
      <div className="flex-1 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-3 min-h-[400px] flex flex-col">
      <div className={`flex items-baseline justify-between pb-3 mb-3 border-b-2 ${column.headerAccent}`}>
        <h2 className="font-semibold text-sm dark:text-white">{column.label}</h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">{tasks.length}</span>
      </div>

      <div
        className={`flex flex-col gap-2 flex-1 rounded-md ${dragOver ? "bg-gray-100 outline-dashed outline-2 outline-gray-300" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDropHere}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnAccent={column.cardAccent}
            isEditing={editingId === task.id}
            onStartEdit={setEditingId}
            onCancelEdit={() => setEditingId(null)}
            onSaveEdit={handleSave}
            onDelete={onDelete}
            onDragStart={handleDragStart}
          />
        ))}
      </div>

      <div className="mt-2">
        {showAddForm ? (
          <TaskForm
            defaultStatus={column.key}
            submitLabel="Create Task"
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <button className="w-full text-left border border-dashed dark:border-gray-600 rounded px-2 py-2 text-sm text-gray-500 dark:text-gray-400" onClick={() => setShowAddForm(true)}>
            + Add task
          </button>
        )}
      </div>
    </div>
  );
}