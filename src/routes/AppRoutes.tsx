import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Feed from '../pages/Feed';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main className="px-4 md:px-6 lg:px-8 pt-24 pb-10 mx-auto max-w-7xl">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Feed />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
