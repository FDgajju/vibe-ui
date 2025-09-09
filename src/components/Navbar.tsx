import type React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const navbarItems = [
    {
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Sign Out",
      path: "/signin",
    },
  ];
  return (
    <nav className=" fixed top-0 inset-x-0 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-200 text-gray-900 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-extrabold tracking-tight text-purple-700">
          <Link
            to="/"
            className="hover:opacity-80 transition no-underline text:gray"
          >
            <h3 className="text-black">VibeBook</h3>
          </Link>
        </div>
        <ul className="hidden sm:flex items-center gap-1 md:gap-2">
          {navbarItems.map((el) => (
            <li key={el.name}>
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                    isActive
                      ? "text-white bg-purple-600 shadow"
                      : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                  }`
                }
              >
                {el.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export const BottomNavBar = () => {
  const navbarItems = [
    {
      name: "Feed",
      path: "/feed",
    },
    {
      name: "Post",
      path: "/create-post",
    },
    {
      name: "Profile",
      path: `/profile/${localStorage.getItem("user_id")}`,
    },
  ];

  return (
    <nav className=" fixed bottom-0 inset-x-0 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-200 text-gray-900 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-center">
        <ul className="flex items-center gap-1 md:gap-2">
          {navbarItems.map((el) => (
            <li key={el.name}>
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                    isActive
                      ? "text-white bg-purple-600 shadow"
                      : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                  }`
                }
              >
                {el.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
