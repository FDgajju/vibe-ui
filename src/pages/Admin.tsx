import type React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidePanel } from "../components/Navbar";

const Admin: React.FC = () => {
  return (
    <div className="flex">
      <AdminSidePanel />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
