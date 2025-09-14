import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { signIn } from "../redux/authSlice";
import api from "../services/api";
import type { UserT } from "../types/types";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<"signup" | "completeProfile">("signup");
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // signup form
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [bio, setBio] = useState("");
  const [signedInUser, setSignedInUser] = useState<UserT | null>(null);

  // complete profile
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resp = await api.post("/auth/signup", {
        fullName,
        userName,
        email,
        password,
        passwordConfirm,
        bio: "",
      });

      if (resp.data?.status) {
        const { token, ...user } = resp.data.data;

        setUserId(user._id);
        setToken(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user._id);
        localStorage.setItem("user_data", JSON.stringify(user));

        dispatch(signIn(user));
        setSignedInUser(user);

        // show profile completion step
        setStep("completeProfile");
      } else {
        setError("Failed to create account.");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: { message?: string } } };
      };
      setError(error.response?.data?.error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage || !bio || !userId || !token) return;

    setLoading(true);
    setError(null);

    const updateData: { profileImage?: string; bio?: string } = {};

    try {
      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);
        URL.revokeObjectURL(profileImagePreview as string);

        const fileResp = await api.post("/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        updateData.profileImage = fileResp.data.data._id;
      }

      updateData.bio = bio;

      const updatedUser = await api.patch("/user/update", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = updatedUser.data;

      localStorage.setItem("user_data", JSON.stringify(data));
      dispatch(signIn(data));

      // navigate to feed
      navigate("/feed");
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { error?: { message?: string } } };
      };
      setError(
        error.response?.data?.error?.message ||
          "Failed to upload profile image.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (step === "completeProfile") {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-md bg-background-secondary rounded-xl shadow-theme ring-1 ring-border p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold mb-4 text-primary">
            Complete your profile
          </h2>

          <img
            src={
              profileImagePreview
                ? profileImagePreview
                : signedInUser?.profileImage.url
            }
            alt="profile"
            className="bg-warning-light h-35 w-35 rounded-full"
            loading="lazy"
          />
          <form onSubmit={handleProfileUpload} className="space-y-5 mt-5">
            <textarea
              onChange={(e) => setBio(e.target.value)}
              name="bio"
              id="bio"
              placeholder="Add bio"
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
            ></textarea>

            <div className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (profileImagePreview)
                    URL.revokeObjectURL(profileImagePreview);

                  if (file) {
                    setProfileImage(file || null);
                    setProfileImagePreview(URL.createObjectURL(file));
                  } else {
                    toast.error("error file upload");
                  }
                }}
                className="block w-full text-sm text-tertiary"
              />
            </div>

            {error && <p className="text-sm text-error">{error}</p>}

            <Button
              type="submit"
              disabled={loading || !profileImage}
              className="w-full justify-center"
            >
              {loading ? "Saving..." : "Save & Continue"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-md bg-background-secondary rounded-xl shadow-theme ring-1 ring-border p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSignUp} className="space-y-5">
          {error && <p className="text-sm text-error text-center">{error}</p>}

          <div className="space-y-2">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-secondary"
            >
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              id="fullname"
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-secondary"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-secondary"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="cspassword"
              className="block text-sm font-medium text-secondary"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={passwordConfirm}
              id="cpassword"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              required
            />
            {password && passwordConfirm && password !== passwordConfirm && (
              <p className="text-sm text-error text-left">Password not match</p>
            )}
            {password && passwordConfirm && password === passwordConfirm && (
              <p className="text-sm text-success text-left">Password matched</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <p className="text-sm text-tertiary text-center">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-semibold text-primary-color hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
