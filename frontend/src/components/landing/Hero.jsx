export default function Hero() {
  return (
    <section id="home" className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            AI Powered Delivery Optimization
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mt-6 leading-tight">
            One Intelligent Fleet
            <br />
            For Every Delivery
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Optimize Food, Grocery, Pharmacy and Parcel deliveries
            using Artificial Intelligence, smart routing, and real-time
            dispatch.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
              Get Started
            </button>

            <button className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-white">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center">
          <img
            src="https://placehold.co/500x400?text=AI+Dispatch+Illustration"
            alt="AI Dispatch Illustration"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}