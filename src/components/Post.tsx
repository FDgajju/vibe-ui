import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { PostT } from "../types/types";
import { prettyDate } from "../utils/dateFormate";
import ActionBar from "./ActionBar";
import Media from "./Media2";

const Post: React.FC<{
  post: PostT;
  onLike: (postId: string) => Promise<void>;
}> = ({ post, onLike }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <article
      key={post._id}
      className="bg-background-secondary rounded-md cursor-pointer shadow-theme ring-1 ring-border overflow-hidden"
      onClick={handlePostClick}
      onKeyDown={(_e) => {}}
    >
      <div className="flex items-center gap-3 p-3 border-b border-default">
        <img
          src={post.author.profileImage.url}
          alt={post.author.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
        {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
          <Link
            to={`/profile/${post.author._id}`}
            className="font-semibold text-primary hover:underline"
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
          onLike={() => onLike(post._id)}
          commentClick={() => navigate(`/post/${post._id}`)}
        />
        <div>
          <span className="text-xs font-semibold text-tertiary">
            {prettyDate(post.createdAt as string)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Post;
