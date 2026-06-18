import type { Task } from "../types/task";
import StatusBadge from "./StatusBadge";

interface Props {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
}

export default function TaskDetail({ task, onClose, onEdit }: Props) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header strip — colored by status */}
        <div
          className={`h-1.5 rounded-t-2xl ${
            task.status === "pending"
              ? "bg-amber-400"
              : task.status === "in_progress"
                ? "bg-indigo-500"
                : "bg-emerald-500"
          }`}
        />

        <div className="p-6">
          {/* Title row */}
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-slate-800 pr-4 leading-snug">
              {task.title}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-5">
            <StatusBadge status={task.status} />
          </div>

          {task.description && (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Description
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {task.description}
              </p>
            </div>
          )}

          {task.dueDate && (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Due date
              </p>
              <p className="text-sm text-slate-700 font-medium">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          {/* Timestamps */}
          <div className="border-t border-slate-100 pt-4 mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Created</p>
              <p className="text-xs font-medium text-slate-600">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Last updated</p>
              <p className="text-xs font-medium text-slate-600">
                {new Date(task.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            >
              Close
            </button>
            <button
              onClick={() => onEdit(task)}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Edit task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
