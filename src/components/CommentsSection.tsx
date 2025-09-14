import { AxiosError } from "axios";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import type { UserT } from "../types/types";
import { prettyDate } from "../utils/dateFormate";
import Button from "./Button";
import { Socket } from "socket.io-client";

export type CommentT = {
  _id: string;
  comment: string;
  createdAt: string;
  by: Partial<UserT>;
};

type CommentsSectionProps = {
  postId: string;
  socket: Socket;
  handleCommentAdded: () => void;
};

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  socket,
  handleCommentAdded,
}) => {
  const [comments, setComments] = useState<CommentT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [_commentMetadata, setCommentMetadata] = useState<{
    totalPages: number;
  }>({ totalPages: 1 });

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !submitting,
    [input, submitting],
  );

  const fetchComments = useCallback(
    async (pageNum: number = 1, isLoadMore: boolean = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const res = await api.get(
          `/comment?post=${postId}&page=${pageNum}&limit=10`,
        );
        const newComments = res.data.data as CommentT[];

        if (isLoadMore) {
          setComments((prev) => [...prev, ...newComments]);
        } else {
          setComments(newComments);
        }

        setCommentMetadata(res.data.meta);
        setHasMore(pageNum < res.data.meta.totalPages);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.error?.message || "Failed to load comments",
          );
        } else {
          toast.error("Failed to load comments");
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [postId],
  );

  // Initial load
  useEffect(() => {
    fetchComments(1, false);
  }, [fetchComments]);

  // Load more comments
  const loadMoreComments = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchComments(nextPage, true);
  }, [page, loadingMore, hasMore, fetchComments]);

  // comment infinite scroll
  const handleScroll = useCallback(async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const threshold = 100;

    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      await loadMoreComments();
    }
  }, [loadMoreComments]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // socket
  useEffect(() => {
    if (!socket) return;

    const handleNewComment = (newComment: CommentT) => {
      console.log(newComment.comment);

      setComments((prevComments) => [newComment, ...prevComments]);
      handleCommentAdded();
    };

    socket.on("commentAdded", handleNewComment);

    return () => {
      socket.off("commentAdded", handleNewComment);
    };
  }, [socket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const content = input.trim();
    const userId = localStorage.getItem("user_id");

    // // add comment
    // const tempId = Date.now().toString(16).padStart(24, "0"); // mongo id
    // const optimistic: CommentT = {
    //   _id: tempId,
    //   comment: content,
    //   createdAt: new Date().toISOString(),
    //   by: {
    //     _id: localStorage.getItem("user_id") || "me",
    //     fullName:
    //       JSON.parse(localStorage.getItem("user_data") || "{}")?.fullName ||
    //       "You",
    //     // @ts-expect-error
    //     profileImage: {
    //       url:
    //         JSON.parse(localStorage.getItem("user_data") || "{}")?.profileImage
    //           ?.url || "",
    //     },
    //   },
    // };

    setSubmitting(true);

    // setComments((prev) => [optimistic, ...prev]);
    setInput("");

    socket.emit("commentPost", {
      post: postId,
      comment: content,
      by: userId,
    });

    setSubmitting(false);

    // try {
    //   const res = await api.post("/comment", {
    //     post: postId,
    //     comment: content,
    //   });
    //   const savedComment = res.data.data as CommentT;
    //   setComments((prev) =>
    //     prev.map((c) => (c._id === tempId ? savedComment : c)),
    //   );

    // } catch (error) {
    //   // Revert optimistic
    //   setComments((prev) => prev.filter((c) => c._id !== tempId));
    //   if (error instanceof AxiosError) {
    //     toast.error(
    //       error.response?.data?.error?.message || "Failed to add comment",
    //     );
    //   } else {
    //     toast.error("Failed to add comment");
    //   }
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <section className="mt-4">
      <h4 className="text-sm font-semibold text-secondary mb-2">Comments</h4>

      <form onSubmit={handleSubmit} className="flex items-start gap-2 mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-none focus:none focus:none"
          rows={2}
        />
        <Button type="submit" disabled={!canSubmit}>
          {submitting ? "Posting..." : "Post"}
        </Button>
      </form>

      <div>
        {loading ? (
          <div className="text-sm text-tertiary">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-sm text-tertiary">No comments yet.</div>
        ) : (
          <ul className="flex flex-col gap-2">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="flex items-start gap-3 border border-gray-300 rounded-md p-2"
              >
                <img
                  src={comment.by.profileImage?.url}
                  alt={comment?.by?.fullName}
                  className="w-8 h-8 rounded-full object-cover mt-0.5"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                      {comment.by.fullName}
                    </span>
                    <span className="text-xs text-tertiary">
                      {prettyDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-secondary whitespace-pre-wrap">
                    {comment.comment}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {loadingMore && (
          <div className="text-sm text-tertiary text-center py-2">
            Loading more comments...
          </div>
        )}

        {!hasMore && comments.length > 0 && (
          <div className="text-sm text-tertiary text-center py-2">
            No more comments to load
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
