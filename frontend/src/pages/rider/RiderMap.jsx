import { FaMapMarkedAlt } from "react-icons/fa";

export default function RiderMap() {
  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold">
        Route Navigation
      </h1>

      <p className="text-slate-500 mt-2">
        AI optimized delivery route.
      </p>

      <div className="bg-white rounded-2xl shadow p-8 mt-8">

        <div className="h-[500px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center">

          <FaMapMarkedAlt
            className="text-blue-600"
            size={80}
          />

          <h2 className="text-2xl font-bold mt-6">
            Live Route Map
          </h2>

          <p className="text-slate-500 mt-3">
            Google Maps integration will appear here.
          </p>

        </div>

      </div>

    </div>
  );
}