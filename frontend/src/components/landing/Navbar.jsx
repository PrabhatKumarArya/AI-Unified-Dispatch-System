import { FaTruck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <FaTruck size={20} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Unified Dispatch
            </h1>
            <p className="text-xs text-slate-500">
              AI Powered Logistics
            </p>
          </div>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          <li className="cursor-pointer hover:text-blue-600"><a href="#home">Home</a></li>
          <li className="cursor-pointer hover:text-blue-600"><a href="#services">Services</a></li>
          <li className="cursor-pointer hover:text-blue-600"><a href="#workflow">Workflow</a></li>
          <li className="cursor-pointer hover:text-blue-600"><a href="#benefits">Benefits</a></li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link to="/login">
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}