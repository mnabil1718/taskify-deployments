export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Visual Side (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between p-10 text-white lg:flex overflow-hidden">
        {/* Background & Overlay */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-900 to-purple-900/40" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "32px 32px"
            }}
          />
        </div>

        {/* Brand */}
        <div className="relative z-20 flex items-center gap-2 text-lg font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold">T</span>
          </div>
          <span className="text-xl tracking-tight">Taskify</span>
        </div>

        {/* Content */}
        <div className="relative z-20 mt-20 space-y-12 max-w-lg">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              Manage your work <br />
              <span className="text-indigo-400">efficiently.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Plan, track, and collaborate on any project. Taskify gives you the flexibility to handle multiple boards and tasks with ease.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Kanban Boards</h3>
              <p className="text-sm text-slate-400">Visualize work with flexible columns and drag-and-drop.</p>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Deadlines</h3>
              <p className="text-sm text-slate-400">Keep track of due dates and never miss a milestone.</p>
            </div>
          </div>
        </div>

        {/* Quote/Footer */}
        <div className="relative z-20 mt-auto pt-10">
          <blockquote className="border-l-2 border-indigo-500 pl-6 italic text-slate-300">
            &quot;The most organized way to get things done. It changed how our team collaborates effectively.&quot;
          </blockquote>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex w-full items-center justify-center lg:w-1/2 bg-slate-50">
        {children}
      </div>
    </div>
  );
}
