import type React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar, { BottomNavBar } from "../components/Navbar";
import CreatePost from "../pages/CreatePost";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Toaster />

      <Navbar />
      <main className="px-4 md:px-6 lg:px-8 pt-24 pb-10 mx-auto max-w-3xl">
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
