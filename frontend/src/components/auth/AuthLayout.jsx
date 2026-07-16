export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

          <h1 className="text-5xl font-bold mb-6">
            AI Unified Dispatch
          </h1>

          <p className="text-lg text-center leading-8 opacity-90">
            Smart delivery orchestration powered by Artificial Intelligence.
            Optimize food, grocery, pharmacy and parcel deliveries from one
            intelligent platform.
          </p>

          <div className="mt-12 text-8xl">
            🚚
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-slate-800">
              {title}
            </h2>

            <p className="text-slate-500 mt-3 mb-8">
              {subtitle}
            </p>

            {children}

          </div>

        </div>

      </div>
    </div>
  );
}