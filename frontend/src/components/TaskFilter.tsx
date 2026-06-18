import { TaskStatus } from "../types/task";

interface Props {
  value: TaskStatus | "";
  onChange: (status: TaskStatus | "") => void;
}

export default function TaskFilter({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Filter
      </label>
      <div className="flex gap-1.5">
        {[
          { value: "" as const, label: "All" },
          { value: TaskStatus.PENDING, label: "Pending" },
          { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
          { value: TaskStatus.COMPLETED, label: "Completed" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              value === option.value
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
