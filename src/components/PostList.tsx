import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addPosts,
  setError,
  setPosts,
  togglePostReaction,
} from "../redux/postsSlice";
import type { AppDispatch, RootState } from "../redux/store";
import api from "../services/api";
import Post from "./Post";
import PostCardSkeleton from "./PostCardSkeleton";

const PostList: React.FC<{ query?: string; authorId?: string }> = ({
  query = "",
  authorId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [postMetadata, setPostMetadata] = useState<{
    totalPages: number;
  }>({ totalPages: 1 });

  const fetchPosts = useCallback(async () => {
    try {
      setPageLoading(true);

      const url = authorId
        ? `/post?author=${authorId}&page=${page}&limit=10`
        : `/post?${query}&page=${page}&limit=10`;

      const result = await api.get(url);

      dispatch(addPosts(result.data.data));
      setPostMetadata(result.data.meta);
    } catch (error) {
      //
      dispatch(setError("Failed to load posts"));
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.error?.message || "Failed to load posts",
        );
      } else {
        toast.error("Failed to load posts");
      }
    } finally {
      setPageLoading(false);
    }
  }, [dispatch, query, authorId, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleScroll = useCallback(async () => {
    try {
      if (
        document.documentElement.scrollTop + window.innerHeight + 1 >
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => {
          if (postMetadata.totalPages > prev) return prev + 1;
          return prev;
        });
      }
    } catch (_error) {}
  }, [postMetadata]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    dispatch(setPosts([]));
  }, [dispatch]);

  const handleOnLike = async (postId: string) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const currentPost = posts.find((p) => p._id === postId);
    if (!currentPost) return;

    dispatch(togglePostReaction(postId));

    try {
      await api.post("/reaction", { post: postId, reaction: "heart" });
    } catch (error) {
      dispatch(togglePostReaction(postId));
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error?.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <PostCardSkeleton key={`skeleton-${n}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => (
        <Post key={post._id} post={post} onLike={handleOnLike} />
      ))}

      {pageLoading && <PostCardSkeleton />}
    </div>
  );
};

export default PostList;
