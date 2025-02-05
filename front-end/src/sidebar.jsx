import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6 h-screen fixed">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Projekt</h1>
      <nav className="space-y-4">
        {["Home", "Projects","hi", "Tasks", "Calendar", "Settings"].map((item, index) => (
          <Link
            key={index}
            to={`/${item.toLowerCase()}`}
            className="block text-gray-700 hover:text-[#FE6059] font-medium"
          >
            {item}
          </Link>
        ))}
      </nav>
    </div>
  );
}
