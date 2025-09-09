import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar, { BottomNavBar } from "../components/Navbar";
import CreatePost from "../pages/CreatePost";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        if (location.pathname !== "/signin" && location.pathname !== "/signup") {
          navigate("/signin");
        }
        return false;
      }
      return true;
    };

    checkTokenValidity();
  }, [navigate, location.pathname]);

  return null;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthChecker />
      <Toaster />

      <Navbar />
      <main className="px-4 md:px-6 lg:px-8 pt-24 pb-20 mx-auto max-w-3xl">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </main>
      <BottomNavBar />
    </Router>
  );
};

export default AppRoutes;
