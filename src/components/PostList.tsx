import type { PostT } from "../types/types";
import { prettyDate } from "../utils/dateFormate";
import ActionBar from "./ActionBar";
import Media from "./Media2";

const Post: React.FC<{ posts: PostT[] }> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => (
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

            <ActionBar likes={89} comments={12} />
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
