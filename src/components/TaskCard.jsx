import { PRIORITIES, formatDate } from "../constants.js";
import TaskForm from "./TaskForm.jsx";

export default function TaskCard({ task, isEditing, onStartEdit, onCancelEdit, onSaveEdit, onDelete, onDragStart }) {
  const pri = PRIORITIES.find((p) => p.key === task.priority) || PRIORITIES[1];

  if (isEditing) {
    return (
      <TaskForm
        initial={task}
        defaultStatus={task.status}
        submitLabel="Save Changes"
        onSubmit={(data) => onSaveEdit(task.id, data)}
        onCancel={onCancelEdit}
      />
    );
  }

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 border dark:border-gray-600 border-l-4 ${pri.border} rounded-md p-3 cursor-grab`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <p className="text-sm font-semibold mb-1 dark:text-white">{task.title}</p>
      {task.desc && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{task.desc}</p>}

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span className={`w-2 h-2 rounded-full ${pri.dot}`}></span>
        {pri.label}
      </div>

      {task.assignee && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          👤 {task.assignee}
        </div>
      )}

      {task.dueDate && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          📅 {formatDate(task.dueDate)}
        </div>
      )}

      <div className="flex gap-1.5">
        <button className="border dark:border-gray-600 dark:text-white rounded px-2 py-0.5 text-xs" onClick={() => onStartEdit(task.id)}>Edit</button>
        <button className="border dark:border-gray-600 rounded px-2 py-0.5 text-xs text-red-500" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
