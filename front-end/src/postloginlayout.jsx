import { Link, Outlet } from "react-router-dom";
import logo from "./assets/logo.jpg";

export default function PostLoginLayout() {
  return (
    <div className="min-h-screen bg-[#FFF8F8] flex">
      <div className="w-64 bg-white shadow-lg p-7">
        <div className="ml-[-20px]">
          <img src={logo} alt="Projekt Logo" className="w-40 h-auto" />
        </div>

        <nav className="space-y-6">
          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-[#FE6059] font-medium transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Home
          </Link>
          <Link
            to="/response"
            className="block text-gray-700 hover:text-[#FE6059] font-medium transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Forms
          </Link>
          <Link
            to="/FormBuilder"
            className="block text-gray-700 hover:text-[#FE6059] font-medium transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            Create
          </Link>
          <Link
            to="/calendar"
            className="block text-gray-700 hover:text-[#FE6059] font-medium transition duration-300 ease-in-out transform hover:translate-x-2"
          >
           
          </Link>
          <Link
            to="/messages"
            className="block text-gray-700 hover:text-[#FE6059] font-medium transition duration-300 ease-in-out transform hover:translate-x-2"
          >
          
          </Link>
          <Link
            to="/settings"
            className="block text-gray-700 hover:text-[#FE6059] font-medium transition duration-300 ease-in-out transform hover:translate-x-2"
          >
           
          </Link>
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; 2025 Projekt. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
