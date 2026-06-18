import { TaskStatus, type Task } from "../types/task";
import StatusBadge from "./StatusBadge";

interface Props {
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

// Signature element: left border color reflects status
const rowAccent = {
  [TaskStatus.PENDING]: "border-l-amber-400",
  [TaskStatus.IN_PROGRESS]: "border-l-indigo-500",
  [TaskStatus.COMPLETED]: "border-l-emerald-500",
};

export default function TaskList({ tasks, onView, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-slate-700 font-semibold mb-1">No tasks yet</p>
        <p className="text-slate-400 text-sm">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-100 bg-slate-50">
        <div className="col-span-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Task
        </div>
        <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Status
        </div>
        <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hidden md:block">
          Due date
        </div>
        <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hidden md:block">
          Created
        </div>
        <div className="col-span-1"></div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-50">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`grid grid-cols-12 px-5 py-4 items-center border-l-4 hover:bg-slate-50/70 transition-colors ${rowAccent[task.status]}`}
          >
            {/* Title */}
            <div className="col-span-5 pr-4">
              <button
                onClick={() => onView(task)}
                className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors text-left line-clamp-1"
              >
                {task.title}
              </button>
              {task.description && (
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  {task.description}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="col-span-2">
              <StatusBadge status={task.status} />
            </div>

            {/* Due date */}
            <div className="col-span-2 text-xs text-slate-500 hidden md:block">
              {task.dueDate ? (
                new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              ) : (
                <span className="text-slate-300">—</span>
              )}
            </div>

            {/* Created */}
            <div className="col-span-2 text-xs text-slate-400 hidden md:block">
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end gap-1">
              <button
                onClick={() => onEdit(task)}
                title="Edit"
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task)}
                title="Delete"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
