import type React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserRoles } from "../types/types";
import Button from "./Button";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const userData = localStorage.getItem("user_data");
  const user = userData ? JSON.parse(userData) : null;

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
      name: userId ? "Sign Out" : "Sign In",
      path: "/signin",
      onClick: handleSignOut,
    },
  ];

  if (user && user.role === UserRoles.ADMIN) {
    navbarItems.unshift({
      name: "Admin",
      path: "/admin/employees",
      onClick: undefined,
    });
  }

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
  const userData = localStorage.getItem("user_data");
  const user = userData ? JSON.parse(userData) : null;

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

  if (user && user.role === UserRoles.ADMIN) {
    navbarItems.push({ name: "Admin", path: "/admin/employees" });
  }

  if (user && user.role === UserRoles.MANAGER) {
    navbarItems.push({ name: "Admin", path: "/admin/pricing" });
  }

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

export const AdminSidePanel = () => {
  const userData = localStorage.getItem("user_data");
  const user = userData ? JSON.parse(userData) : null;

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_data");
    navigate("/signin");
  };

  const sidePanelItems: any = {
    [UserRoles.ADMIN]: {
      top: [
        { name: "Employee List", path: "/admin/employees", onClick: undefined },
        {
          name: "Create Employee",
          path: "/admin/create-employee",
          onClick: undefined,
        },
        { name: "Pricing list", path: "/admin/pricing", onClick: undefined },
        { name: "Add Pricing", path: "/admin/pricing/add", onClick: undefined },
      ],
      bottom: [
        { name: "Lets Vibe", path: "/feed", onclick: undefined },
        {
          name: user ? "Sign Out" : "Sign In",
          path: "/signin",
          onClick: handleSignOut,
        },
      ],
    },
    [UserRoles.MANAGER]: {
      top: [
        { name: "Pricing list", path: "/admin/pricing", onClick: undefined },
        { name: "Add Pricing", path: "/admin/pricing/add", onClick: undefined },
      ],

      bottom: [
        { name: "Lets Vibe", path: "/feed", onclick: undefined },
        {
          name: user ? "Sign Out" : "Sign In",
          path: "/signin",
          onClick: handleSignOut,
        },
      ],
    },
  };

  return (
    <aside className="w-64 bg-background-secondary text-primary h-screen p-4 border-r border-default">
      <h1 className="text-2xl font-bold mb-4 text-primary-color">
        Admin Panel
      </h1>
      <nav className="flex flex-col gap-10">
        <div>
          {user &&
            sidePanelItems[user?.role].top.map((item: any) => (
              <ul key={item.name}>
                <li className="mb-2">
                  <Link
                    to={item.path}
                    className="text-secondary hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              </ul>
            ))}
        </div>
        <div>
          {user &&
            sidePanelItems[user?.role].bottom.map((item: any) => (
              <ul key={item.name}>
                <Button className="mb-2" onClick={item.onClick}>
                  <Link
                    to={item.path}
                    // className=" hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </Button>
              </ul>
            ))}
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
