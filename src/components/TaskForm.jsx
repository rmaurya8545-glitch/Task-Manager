import { useState } from "react";
import { STATUS, PRIORITIES } from "../constants.js";

export default function TaskForm({ initial, defaultStatus, submitLabel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [desc, setDesc] = useState(initial?.desc || "");
  const [priority, setPriority] = useState(initial?.priority || "medium");
  const [status, setStatus] = useState(initial?.status || defaultStatus);
  const [assignee, setAssignee] = useState(initial?.assignee || "");
  const [dueDate, setDueDate] = useState(initial?.dueDate || "");

  function handleSubmit() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onSubmit({
      title: trimmedTitle,
      desc: desc.trim(),
      priority,
      status,
      assignee: assignee.trim(),
      dueDate
    });
  }

  const inputClass =
    "w-full border rounded px-2 py-1.5 text-sm mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white";
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1";

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg p-3">
      <label className={labelClass}>Task Title</label>
      <input
        className={inputClass}
        placeholder="e.g. Design login page"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className={labelClass}>Description</label>
      <textarea
        className={inputClass}
        placeholder="Describe what needs to be done..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <label className={labelClass}>Priority</label>
          <select
            className="w-full border rounded px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className={labelClass}>Status</label>
          <select
            className="w-full border rounded px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="flex-1">
          <label className={labelClass}>Assignee</label>
          <input
            className="w-full border rounded px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="e.g. Ram"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          className="bg-sky-600 text-white text-xs font-semibold px-3 py-1.5 rounded"
          onClick={handleSubmit}
        >
          {submitLabel}
        </button>
        <button
          className="border dark:border-gray-600 dark:text-white text-xs px-3 py-1.5 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}