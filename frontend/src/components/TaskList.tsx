import { TaskStatus, type Task } from "../types/task";
import StatusBadge from "./StatusBadge";

interface Props {
  tasks: Task[];
  emptyMessage?: string;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusIndicatorColor = {
  [TaskStatus.PENDING]: "bg-amber-400",
  [TaskStatus.IN_PROGRESS]: "bg-indigo-500",
  [TaskStatus.COMPLETED]: "bg-emerald-500",
};

export default function TaskList({ tasks, emptyMessage, onView, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50/50 flex items-center justify-center mx-auto mb-4 border border-indigo-100/50">
          <svg
            className="w-8 h-8 text-indigo-500/80"
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
        <p className="text-slate-700 font-semibold mb-1">
          {emptyMessage ?? 'No tasks yet'}
        </p>
        <p className="text-slate-400 text-sm">
          {emptyMessage ? 'Try a different search term or filter' : 'Create your first task to get started'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group relative bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          {/* Status Color Pill */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl overflow-hidden">
            <div className={`w-full h-full ${statusIndicatorColor[task.status]}`} />
          </div>

          {/* Left Column: Info */}
          <div className="flex-1 min-w-0 pl-2">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <button
                onClick={() => onView(task)}
                className="text-base font-bold text-slate-800 hover:text-indigo-600 transition text-left cursor-pointer break-all"
              >
                {task.title}
              </button>
              <StatusBadge status={task.status} />
            </div>

            {task.description && (
              <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                {task.description}
              </p>
            )}

            {/* Metadata (Due Date, Created Date) */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              {/* Created Date */}
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {task.dueDate ? (
                  <span className="font-medium text-slate-500">
                    Due {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                ) : (
                  <span>No due date</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="flex items-center gap-1.5 self-end sm:self-center border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => onView(task)}
              title="View Details"
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button
              onClick={() => onEdit(task)}
              title="Edit Task"
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
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
              title="Delete Task"
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
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
  );
}
