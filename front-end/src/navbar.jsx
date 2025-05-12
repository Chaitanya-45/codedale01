import { Disclosure } from "@headlessui/react";
import logo from "./assets/logo.jpg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <img 
              src={logo} 
              alt="DotForm Logo" 
              className="h-25 object-contain" 
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}