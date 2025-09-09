import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Post from "../components/PostList";
import api from "../services/api";
import type { PostT, UserT } from "../types/types";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserT | null>(null);
  const [posts, setPosts] = useState<PostT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          api.get(`/user/${id}`),
          api.get(`/post?author=${id}`),
        ]);

        setUser(userRes.data.data);
        setPosts(postsRes.data.data || []);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">User not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
          <img
            src={user.profileImage?.url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-gray-300 mx-auto sm:mx-0"
          />

          <div className="flex-1 text-center sm:text-left">
            {/* Username and actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 space-y-2 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold">{user.userName}</h1>
              <div className="flex justify-center sm:justify-start space-x-2">
                <Button className="px-4 py-1 text-sm font-semibold border rounded-md">
                  Follow
                </Button>
                <Button className="px-4 py-1 text-sm font-semibold border rounded-md">
                  Message
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center sm:justify-start space-x-6 mb-4">
              <p>
                <span className="font-bold">{posts.length}</span> posts
              </p>
              <p>
                <span className="font-bold">0</span> followers
              </p>
              <p>
                <span className="font-bold">0</span> following
              </p>
            </div>

            {/* Bio */}
            <div>
              <h2 className="font-semibold">{user.fullName}</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {user.bio || "No bio yet."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="p-2 sm:p-4 max-w-5xl mx-auto">
        <Post posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
