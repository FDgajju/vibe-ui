import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar, { BottomNavBar } from "../components/Navbar";
import CreatePost from "../pages/CreatePost";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import SinglePost from "../pages/SinglePost";
import Admin from "../pages/Admin";
import EmployeeList from "../pages/EmployeeList";
import CreateEmployee from "../pages/CreateEmployee";
import { AuthenticatedRoute, AdminRoute } from "./ProtectedRoutes";
import PricingList from "../pages/PricingList";
import CreatePrice from "../pages/CreatePrice";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const userId = localStorage.getItem("user_id");
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminPage && <Navbar />}
      <main
        className={
          !isAdminPage
            ? "px-4 md:px-6 lg:px-8 pt-24 pb-20 mx-auto max-w-3xl"
            : ""
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Authenticated Routes */}
          <Route element={<AuthenticatedRoute />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/" element={<Feed />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<Admin />}>
                <Route path="employees" element={<EmployeeList />} />
                <Route path="create-employee" element={<CreateEmployee />} />
                <Route path="pricing" element={<PricingList />} />
                <Route path="pricing/add" element={<CreatePrice />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Feed />} />
        </Routes>
      </main>
      {userId && !isAdminPage && <BottomNavBar />}
    </>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default AppRoutes;
