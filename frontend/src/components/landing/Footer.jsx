import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTruck,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-14">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* Brand */}

        <div>
          <div className="flex items-center gap-3">
            <FaTruck size={28} className="text-blue-400" />

            <h2 className="text-2xl font-bold">
              Unified Dispatch
            </h2>
          </div>

          <p className="text-slate-400 mt-5">
            AI-powered delivery orchestration platform that intelligently
            assigns riders across multiple services while minimizing
            delivery time and operational cost.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="font-bold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-slate-400">
            <li className="hover:text-white cursor-pointer"><a href="#home">Home</a></li>
            <li className="hover:text-white cursor-pointer"><a href="#services">Services</a></li>
            <li className="hover:text-white cursor-pointer"><a href="#workflow">Workflow</a></li>
            <li className="hover:text-white cursor-pointer"><a href="#analytics">Analytics</a></li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="font-bold text-lg mb-4">
            Connect
          </h3>

          <div className="space-y-4 text-slate-400">

            <div className="flex items-center gap-3">
              <FaEnvelope />
              support@dispatch.ai
            </div>

            <div className="flex items-center gap-3">
              <FaGithub />
              GitHub
            </div>

            <div className="flex items-center gap-3">
              <FaLinkedin />
              LinkedIn
            </div>

          </div>
        </div>

      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-slate-500">
        © 2026 AI Unified Dispatch System. All Rights Reserved.
      </div>
    </footer>
  );
}