import { useState, useEffect } from "react";
import { TaskStatus, type CreateTaskPayload, type Task } from "../types/task";

interface Props {
  taskToEdit?: Task | null;
  onSubmit: (data: CreateTaskPayload) => Promise<void>;
  onCancel: () => void;
}

export default function TaskForm({ taskToEdit, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split("T")[0] : "");
    } else {
      setTitle("");
      setDescription("");
      setStatus(TaskStatus.PENDING);
      setDueDate("");
    }
    setErrors({});
  }, [taskToEdit]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (title.length > 100)
      newErrors.title = "Title cannot exceed 100 characters";
    if (description.length > 500)
      newErrors.description = "Description cannot exceed 500 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        dueDate: dueDate || undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isEditing = !!taskToEdit;

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400
     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition
     ${errors[field] ? "border-red-300 bg-red-50" : "border-slate-200 bg-white hover:border-slate-300"}`;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEditing ? "Edit task" : "New task"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isEditing
              ? "Update the details below"
              : "Fill in the details to create a task"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Title{" "}
              <span className="text-red-400 normal-case tracking-normal">
                *
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className={inputClass("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more context... (optional)"
              rows={3}
              className={`${inputClass("description")} resize-none`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.description}
              </p>
            )}
          </div>

          {/* Status + Due Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className={inputClass("status")}
              >
                <option value={TaskStatus.PENDING}>Pending</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Due date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputClass("dueDate")}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
