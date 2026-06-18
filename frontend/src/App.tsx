import { useState, useEffect, useCallback } from "react";
import {
  TaskStatus,
  type CreateTaskPayload,
  type Task,
  type UpdateTaskPayload,
} from "./types/task";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import TaskFilter from "./components/TaskFilter";
import ConfirmDialog from "./components/ConfirmDialog";
import Landing from "./components/Landing";

export default function App() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToView, setTaskToView] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);


  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [filtered, all] = await Promise.all([
        getTasks(statusFilter || undefined),
        getTasks(),
      ]);
      setTasks(filtered);
      setAllTasks(all);
    } catch {
      setError(
        "Could not connect to the backend. Make sure it is running on port 3000.",
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (payload: CreateTaskPayload) => {
    await createTask(payload);
    setShowForm(false);
    fetchTasks();
  };

  const handleUpdate = async (payload: UpdateTaskPayload) => {
    if (!taskToEdit) return;
    await updateTask(taskToEdit.id, payload);
    setTaskToEdit(null);
    setShowForm(false);
    fetchTasks();
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    await deleteTask(taskToDelete.id);
    setTaskToDelete(null);
    fetchTasks();
  };

  const handleEditFromDetail = (task: Task) => {
    setTaskToView(null);
    setTaskToEdit(task);
    setShowForm(true);
  };

  const stats = {
    total: allTasks.length,
    pending: allTasks.filter((t) => t.status === TaskStatus.PENDING).length,
    inProgress: allTasks.filter((t) => t.status === TaskStatus.IN_PROGRESS)
      .length,
    completed: allTasks.filter((t) => t.status === TaskStatus.COMPLETED).length,
  };

  if (view === "landing") {
    return <Landing onEnterApp={() => setView("app")} stats={stats} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setView("landing")}
            className="flex items-center gap-2.5 hover:opacity-85 transition cursor-pointer text-left bg-transparent border-0 p-0"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="font-bold text-slate-800 tracking-tight">
              TaskFlow
            </span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("landing")}
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setTaskToEdit(null);
                setShowForm(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm shadow-indigo-200"
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
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-2 md:pt-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Tasks</p>
              <p className="text-3xl font-extrabold text-slate-800">{stats.total}</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pending</p>
              <p className="text-3xl font-extrabold text-amber-600">{stats.pending}</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">In Progress</p>
              <p className="text-3xl font-extrabold text-indigo-600">{stats.inProgress}</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Completed</p>
              <p className="text-3xl font-extrabold text-emerald-600">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <TaskFilter value={statusFilter} onChange={setStatusFilter} />
          {!loading && (
            <p className="text-xs text-slate-400">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-20 text-center">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-100 py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-slate-700 font-medium mb-1">Connection failed</p>
            <p className="text-slate-400 text-sm mb-4">{error}</p>
            <button
              onClick={fetchTasks}
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onView={(task) => setTaskToView(task)}
            onEdit={(task) => {
              setTaskToEdit(task);
              setShowForm(true);
            }}
            onDelete={(task) => setTaskToDelete(task)}
          />
        )}
      </main>

      {showForm && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSubmit={taskToEdit ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
        />
      )}
      {taskToView && (
        <TaskDetail
          task={taskToView}
          onClose={() => setTaskToView(null)}
          onEdit={handleEditFromDetail}
        />
      )}
      {taskToDelete && (
        <ConfirmDialog
          message={`"${taskToDelete.title}" will be permanently removed.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}
