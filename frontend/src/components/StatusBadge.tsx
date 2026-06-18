import { TaskStatus } from "../types/task";

interface Props {
  status: TaskStatus;
}

const statusConfig = {
  [TaskStatus.PENDING]: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "In Progress",
    className: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  },
  [TaskStatus.COMPLETED]: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
};

export default function StatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
