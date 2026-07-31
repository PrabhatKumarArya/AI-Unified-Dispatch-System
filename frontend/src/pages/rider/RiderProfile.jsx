import { FaUserCircle, FaMotorcycle, FaStar } from "react-icons/fa";

export default function RiderProfile() {
  return (
    <div className="mt-8">

      <h1 className="text-3xl font-bold">
        Rider Profile
      </h1>

      <div className="bg-white rounded-2xl shadow p-8 mt-8">

        <div className="flex items-center gap-6">

          <FaUserCircle
            size={90}
            className="text-blue-600"
          />

          <div>

            <h2 className="text-2xl font-bold">
              Rahul Sharma
            </h2>

            <p className="text-slate-500">
              Delivery Partner
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-100 rounded-xl p-6">

            <FaMotorcycle
              className="text-blue-600"
              size={30}
            />

            <h3 className="mt-3 font-semibold">
              Deliveries
            </h3>

            <p className="text-3xl font-bold">
              532
            </p>

          </div>

          <div className="bg-slate-100 rounded-xl p-6">

            <FaStar
              className="text-yellow-500"
              size={30}
            />

            <h3 className="mt-3 font-semibold">
              Rating
            </h3>

            <p className="text-3xl font-bold">
              4.9
            </p>

          </div>

          <div className="bg-slate-100 rounded-xl p-6">

            <h3 className="font-semibold">
              Experience
            </h3>

            <p className="text-3xl font-bold mt-3">
              3 Years
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}