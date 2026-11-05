import { useState } from "react";
import { STATUS, PRIORITIES } from "../constants.js";
import Spinner from "./Spinner.jsx";

export default function TaskForm({ initial, defaultStatus, submitLabel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [desc, setDesc] = useState(initial?.description || "");
  const [priority, setPriority] = useState(initial?.priority || "medium");
  const [status, setStatus] = useState(initial?.status || defaultStatus);
  const [assignee, setAssignee] = useState(initial?.assignee || "");
  const [dueDate, setDueDate] = useState(initial?.dueDate || "");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Task title is required";
    if (!priority) newErrors.priority = "Select a priority";
    if (!status) newErrors.status = "Select a status";
    if (!assignee.trim()) newErrors.assignee = "Assignee is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitError("");
    setSaving(true);

    Promise.resolve(
      onSubmit({
        title: title.trim(),
        description: desc.trim(),
        priority,
        status,
        assignee: assignee.trim(),
        dueDate
      })
    )
      .catch(() =>
        setSubmitError("Could not save. Please check your connection and try again.")
      )
      .finally(() => setSaving(false));
  }

  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1";

  function fieldClass(name) {
    return `w-full border rounded px-2 py-1.5 text-sm mb-1 dark:bg-gray-700 dark:text-white ${
      errors[name] ? "border-red-500 dark:border-red-500" : "dark:border-gray-600"
    }`;
  }

  function errorText(name) {
    return errors[name] ? (
      <p className="text-xs text-red-500 mb-2 mt-0">{errors[name]}</p>
    ) : null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg p-3">
      <label className={labelClass}>Task Title</label>
      <input
        className={fieldClass("title")}
        placeholder="e.g. Design login page"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errorText("title")}

      <label className={labelClass}>Description</label>
      <textarea
        className="w-full border rounded px-2 py-1.5 text-sm mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Describe what needs to be done..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label className={labelClass}>Priority</label>
          <select className={fieldClass("priority")} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">Select priority</option>
            {PRIORITIES.map((p) => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>
          {errorText("priority")}
        </div>
        <div className="flex-1">
          <label className={labelClass}>Status</label>
          <select className={fieldClass("status")} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            {STATUS.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          {errorText("status")}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label className={labelClass}>Assignee</label>
          <input
            className={fieldClass("assignee")}
            placeholder="e.g. Ram"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          {errorText("assignee")}
        </div>
        <div className="flex-1">
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            className={fieldClass("dueDate")}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {errorText("dueDate")}
        </div>
      </div>

      {submitError && <p className="text-xs text-red-500 mb-2">{submitError}</p>}

      <div className="flex gap-2 mt-1">
        <button
          disabled={saving}
          className="bg-sky-600 text-white text-xs font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleSubmit}
        >
          {saving && <Spinner className="w-3 h-3" />}
          {saving ? "Saving..." : submitLabel}
        </button>
        <button
          disabled={saving}
          className="border dark:border-gray-600 dark:text-white text-xs px-3 py-1.5 rounded disabled:opacity-70"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
