interface LandingProps {
  onEnterApp: () => void;
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
  isConnected: boolean;
}

export default function Landing({
  onEnterApp,
  stats,
  isConnected,
}: LandingProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <svg
                className="w-4.5 h-4.5 text-white"
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
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              TaskFlow
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Features
            </a>
            <a
              href="#preview"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              App Preview
            </a>
            <a
              href="#metrics"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              System Stats
            </a>
          </nav>

          <button
            onClick={onEnterApp}
            className="group flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-sm hover:shadow-indigo-200"
          >
            Launch Workspace
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Abstract Background Gradients */}
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-100/40 blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 mb-6 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Internship Assessment Project
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Organize your projects <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              with speed & clarity.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            TaskFlow is a high-performance, minimalist task manager designed to
            keep developers and creators in flow. Filter, track, and complete
            tasks seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-98"
            >
              Start Managing Tasks
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-2xl border border-slate-200 transition text-center"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Real-time App Statistics Banner */}
      <section id="metrics" className="max-w-5xl mx-auto w-full px-6 mb-20">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                Live App Activity
              </h3>
              <p className="text-sm text-slate-500">
                Real-time status metrics direct from the local workspace
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 ${
                isConnected
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isConnected ? "bg-emerald-500 animate-ping" : "bg-red-400"
                }`}
              />
              {isConnected ? "Connected" : "Backend offline"}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Total Tasks
              </p>
              <p className="text-3xl font-extrabold text-slate-800">
                {stats.total}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Pending
              </p>
              <p className="text-3xl font-extrabold text-amber-600">
                {stats.pending}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                In Progress
              </p>
              <p className="text-3xl font-extrabold text-indigo-600">
                {stats.inProgress}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Completed
              </p>
              <p className="text-3xl font-extrabold text-emerald-600">
                {stats.completed}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-white py-20 border-y border-slate-100"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-slate-600">
              A carefully designed set of capabilities focused on speed,
              distraction-free execution, and intuitive controls.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-100 border border-transparent transition group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Smart Filters
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Effortlessly view pending tasks, highlight items currently
                in-progress, or review completed milestones with a single click.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-100 border border-transparent transition group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Instant Updates
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Add, edit, change status, and delete tasks instantly. Visual
                status indicators adapt dynamically to show progress state.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-100 border border-transparent transition group">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Local Reliability
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Saves to a local database system for maximum reliability,
                ensuring your data is ready whenever you access the application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Frame */}
      <section id="preview" className="py-20 max-w-5xl mx-auto w-full px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
            A Preview of Your Workspace
          </h2>
          <p className="text-slate-600">
            Beautifully simple, clean, and organized list layouts that focus on
            what matters most.
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-4 shadow-xl border border-slate-800/80 max-w-4xl mx-auto relative overflow-hidden group">
          {/* Decorative Window Controls */}
          <div className="flex gap-1.5 items-center mb-4 px-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-500 font-mono ml-4 select-none">
              taskflow-dashboard.app
            </span>
          </div>

          {/* Fake Workspace Canvas */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800/40 relative">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-32 rounded bg-slate-800" />
              <div className="h-8 w-24 rounded-lg bg-indigo-600/80" />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="h-16 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                <span className="w-8 h-2 rounded bg-slate-700" />
                <span className="w-16 h-3 rounded bg-amber-500/20" />
              </div>
              <div className="h-16 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                <span className="w-10 h-2 rounded bg-slate-700" />
                <span className="w-20 h-3 rounded bg-indigo-500/20" />
              </div>
              <div className="h-16 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between">
                <span className="w-12 h-2 rounded bg-slate-700" />
                <span className="w-14 h-3 rounded bg-emerald-500/20" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Refactor backend API endpoints",
                  tag: "In Progress",
                  color: "border-indigo-500/30",
                },
                {
                  title: "Design Landing Page Mockup",
                  tag: "Completed",
                  color: "border-emerald-500/30",
                },
                {
                  title: "Draft assessment project docs",
                  tag: "Pending",
                  color: "border-amber-500/30",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-xl bg-slate-900 border ${item.color}`}
                >
                  <span className="text-sm font-medium text-slate-300">
                    {item.title}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Hover overlay CTA */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={onEnterApp}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition active:scale-95"
              >
                Launch Live App
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
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
            <span className="font-bold text-white tracking-tight">
              TaskFlow
            </span>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
