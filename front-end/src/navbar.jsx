import { Disclosure } from "@headlessui/react";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-[#FFF8F8] text-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-19 w-27 rounded-lg" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="hidden sm:block">
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/login"
              className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600 ml-4"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
