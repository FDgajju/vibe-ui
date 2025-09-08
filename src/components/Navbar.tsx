import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 inset-x-0 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-200 text-gray-900 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-extrabold tracking-tight text-purple-700">
          <Link to="/" className="hover:opacity-80 transition no-underline text:gray">
            <h3 className="text-black">VibeBook</h3>
          </Link>
        </div>
        <ul className="flex items-center gap-1 md:gap-2">
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                  isActive
                    ? "text-white bg-purple-600 shadow"
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                }`
              }
            >
              Feed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                  isActive
                    ? "text-white bg-purple-600 shadow"
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                }`
              }
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                  isActive
                    ? "text-white bg-purple-600 shadow"
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                }`
              }
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
