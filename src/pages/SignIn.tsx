import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { signIn } from "../redux/authSlice";
import api from "../services/api";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await api.post("/auth/signin", {
        user: username,
        password,
      });

      if (resp.data?.status) {
        const { token, ...user } = resp.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user._id);
        localStorage.setItem("user_data", JSON.stringify(user));

        dispatch(signIn(user));

        navigate("/feed");
      } else {
        toast.error("Invalid credentials, please try again.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-md bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
              placeholder="username/email"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2.5 px-3"
              placeholder="********"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-purple-700 hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
