import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import PostList from "../components/PostList";
import api from "../services/api";
import type { PostT, UserWithStatsT } from "../types/types";
import type { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { setError } from "../redux/postsSlice";
import { AxiosError } from "axios";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserWithStatsT | null>(null);
  const [_posts, _setPosts] = useState<PostT[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const [userRes] = await Promise.all([api.get(`/user/${id}`)]);
        setUser(userRes.data.data);
      } catch (error: any) {
        toast.error(
          error.response?.data.error?.message || "Failed to fetch user data",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserAndPosts();
  }, [id]);

  const onFollow = async () => {
    try {
      const resp = await api.post("/connection", { followTo: id });
      if (resp.status.toString().startsWith("2")) {
        setFollowing(true);
        toast.success(`You are now following ${user?.fullName}`);
      }
    } catch (error) {
      dispatch(setError("Failed to load posts"));
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.error?.message || "Failed to load posts",
        );
      } else {
        toast.error("Failed to load posts");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary-lighter border-t-primary rounded-full animate-spin"></div>
          <p className="text-tertiary">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <p className="text-tertiary font-bold text-6xl">😕</p>
        <p className="text-tertiary font-bold text-4xl">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Section */}
      <div className="bg-background-secondary border-b border-primary-lighter">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex justify-center sm:justify-start">
              <img
                src={
                  user.profileImage?.url || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-default"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-primary">
                  {user.userName}
                </h1>
                {localStorage.getItem("user_id") !== id && (
                  <div className="flex justify-center sm:justify-start gap-3">
                    <Button
                      variant={following ? "secondary" : "primary"}
                      disabled={!!following || !!user.isFollowing}
                      onClick={onFollow}
                    >
                      {!!following || !!user.isFollowing
                        ? "Following"
                        : "Follow"}
                    </Button>
                    <Button>Message</Button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-8 font-semibold">
                <div className="">
                  <span className="font-semibold text-primary">
                    {user.post_count}
                  </span>
                  <span className="text-tertiary ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">
                    {user.follower_count}
                  </span>
                  <span className="text-tertiary ml-1">Followers</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">
                    {user.following_count}
                  </span>
                  <span className="text-tertiary ml-1">Following</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h2 className="font-semibold text-primary">{user.fullName}</h2>
                <p className="text-secondary max-w-md text-left">
                  {user.bio || "No bio yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <PostList authorId={id} />
      </div>
    </div>
  );
};

export default Profile;
