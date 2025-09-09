import type React from "react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import PostCardSkeleton from "../components/PostCardSkeleton";
import PostList from "../components/PostList";
import api from "../services/api";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("")

  const fetchFeed = useCallback(async () => {
    try {
      const result = await api.get(`/post?${query}`);
      setPosts(result.data.data);
    } catch (error: any) {
      toast.error(error.response?.data.error.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    fetchFeed();

    return () => controller.abort();
  }, [fetchFeed]);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-fuchsia-600 text-white mb-10">
        <div className="px-6 md:px-10 lg:px-12 py-14 md:py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Welcome {} Discover, share, and vibe together
            </h1>
            <p className="mt-4 text-white/90 md:text-lg">
              Curated posts from people and topics you follow. Join the
              conversation and find your next inspiration.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button>
                <Link to="/create-post">Create Post</Link>
              </Button>
              <Button variant="secondary">Explore</Button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Feed grid */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <PostCardSkeleton key={`${index}-${Math.random() * 100}`} />
          ))}
        </div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default Feed;
