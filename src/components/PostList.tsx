import { AxiosError } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import type { PostT } from "../types/types";
import { prettyDate } from "../utils/dateFormate";
import ActionBar from "./ActionBar";
import Media from "./Media2";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { setPosts, togglePostReaction } from "../redux/postsSlice";

const Post: React.FC<{ posts: PostT[] }> = ({ posts }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts: reduxPosts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(setPosts(posts ?? []));
  }, [posts, dispatch]);

  const handleOnLike = async (postId: string) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const currentPost = reduxPosts.find(p => p._id === postId);
    if (!currentPost) return;

    // Optimistic update via Redux
    dispatch(togglePostReaction(postId));

    try {
      await api.post("/reaction", { post: postId, reaction: "heart" });
    } catch (error) {
      // Revert optimistic update on failure
      dispatch(togglePostReaction(postId));
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {reduxPosts?.map((post) => (
        <article
          key={post._id}
          className="bg-white rounded-md shadow-sm ring-1 ring-gray-200 overflow-hidden"
        >
          {/* User info x author */}
          <div className="flex items-center gap-3 p-3 border-b border-gray-200">
            <img
              src={post.author.profileImage.url}
              alt={post.author.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                {post.author.fullName}
              </span>
              {post.location && (
                <span className="text-xs text-gray-500">{post.location}</span>
              )}
            </div>
          </div>

          {/* Media Section */}
          <Media media={post.media} />

          {/* Content Section */}
          <div className="p-2">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
              {post.title}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

            <ActionBar
              likes={post.likes}
              comments={post.comments}
              isReacted={post.isReacted}
              onLike={() => {
                return handleOnLike(post._id);
              }}
            />
            <div>
              <span className="text-xs font-semibold text-gray-500">
                {prettyDate(post.createdAt as string)}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Post;
