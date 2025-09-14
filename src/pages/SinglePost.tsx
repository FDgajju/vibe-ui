import { AxiosError } from "axios";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ActionBar from "../components/ActionBar";
import CommentsSection from "../components/CommentsSection";
import Media from "../components/Media2";
import api from "../services/api";
import type { PostT } from "../types/types";
import { prettyDate } from "../utils/dateFormate";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/env";

const socket = io(BASE_URL, {
  reconnection: true,
});

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostT | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

    const handleCommentAdded = useCallback(() => {
    setPost((currentPost) => {
      if (!currentPost) return null;
      return {
        ...currentPost,
        comment_count: (currentPost.comment_count as number) + 1,
      };
    });
  }, []);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await api.get(`/post/${id}`);
      setPost(res.data.data as PostT);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.error?.message || "Failed to load post",
        );
      } else {
        toast.error("Failed to load post");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // socket
  useEffect(() => {
    if (!id) return;
    socket.emit("joinPostRoom", id);
    console.log(`Joined room for post: ${id}`);

    const handleUpdateLikes = (data: {
      postId: string;
      newLikesCount: number;
      isReacted: boolean;
    }) => {
      if (data.postId === id) {
        setPost((currentPost) => {
          if (!currentPost) return null;
          return {
            ...currentPost,
            reaction_count: data.newLikesCount,
            isReacted: data.isReacted,
          };
        });
      }
    };

    socket.on("updateLikes", handleUpdateLikes);

    return () => {
      console.log(`Leaving room for post: ${id}`);
      socket.emit("leavePostRoom", id);
      socket.off("updateLikes", handleUpdateLikes);
      // socket.off("commentAdded", handleCommentAdded);
    };
  }, []);

  const handleOnLike = async () => {
    if (!post) return;
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const optimistic = { ...post };
    optimistic.isReacted = !optimistic.isReacted;
    optimistic.reaction_count =
      (optimistic.reaction_count as number) + (optimistic.isReacted ? 1 : -1);
    setPost(optimistic);

    socket.emit("likePost", { post: id, reaction: "heart", user: userId });
  };

  if (loading || !post) {
    return <div className="text-center text-tertiary">Loading...</div>;
  }

  return (
    <article className="bg-background-secondary rounded-md shadow-theme ring-1 ring-border overflow-hidden">
      <div className="flex items-center gap-3 p-3 border-b border-default">
        <img
          src={post.author.profileImage.url}
          alt={post.author.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <Link
            to={`/profile/${post.author._id}`}
            className="hover:underline font-semibold text-primary"
          >
            {post.author.fullName}
          </Link>
          {post.location && (
            <span className="text-xs text-tertiary">{post.location}</span>
          )}
        </div>
      </div>

      <Media media={post.media} />

      <div className="p-2">
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-1">
          {post.title}
        </h3>
        <p className="text-secondary leading-relaxed mb-4">{post.content}</p>

        <ActionBar
          likes={post.reaction_count}
          comments={post.comment_count}
          isReacted={post.isReacted}
          onLike={handleOnLike}
        />
        <div>
          <span className="text-xs font-semibold text-tertiary">
            {prettyDate(post.createdAt as string)}
          </span>
        </div>
      </div>

      <div className="px-2 pb-4">
        <CommentsSection
          postId={post._id}
          socket={socket}
          handleCommentAdded={handleCommentAdded}
        />
      </div>
    </article>
  );
};

export default SinglePost;
