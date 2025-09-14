import type React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id")

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_data");
    navigate("/signin");
  };

  const navbarItems = [
    {
      name: "Settings",
      path: "/settings",
      onClick: undefined,
    },
    {
      name: userId ?"Sign Out" : "Sign In",
      path: "/signin",
      onClick: handleSignOut,
    },
  ];
  return (
    <nav className="fixed top-0 inset-x-0 backdrop-blur supports-[backdrop-filter]:bg-background-secondary/70 bg-background-secondary/90 border-b border-default text-primary z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-extrabold tracking-tight text-primary-color">
          <Link
            to="/"
            className="hover:opacity-80 transition no-underline text-primary"
          >
            <h3 className="text-primary">VibeBook</h3>
          </Link>
        </div>
        <ul className="flex items-center gap-1 md:gap-2">
          {navbarItems.map((el) => (
            <li key={el.name}>
              <NavLink
                to={el.path}
                onClick={el.onClick}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                    isActive
                      ? "text-inverse bg-primary shadow-theme"
                      : "text-secondary hover:text-primary-color hover:bg-primary-lightest"
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
    <nav className="fixed block bottom-0 inset-x-0 backdrop-blur supports-[backdrop-filter]:bg-background-secondary/70 bg-background-secondary/90 border-b border-default text-primary z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-center">
        <ul className="flex items-center gap-1 md:gap-2">
          {navbarItems.map((el) => (
            <li key={el.name}>
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm md:text-base font-medium transition ${
                    isActive
                      ? "text-inverse bg-primary shadow-theme"
                      : "text-secondary hover:text-primary-color hover:bg-primary-lightest"
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
