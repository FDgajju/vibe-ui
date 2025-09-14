import type React from "react";

const PostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-background-secondary shadow-theme rounded-lg p-4 mb-4 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-background-tertiary mr-3"></div>
        <div>
          <div className="h-4 bg-background-tertiary rounded w-32 mb-2"></div>
          <div className="h-3 bg-background-tertiary rounded w-24"></div>
        </div>
      </div>
      <div className="h-4 bg-background-tertiary rounded w-full mb-2"></div>
      <div className="h-4 bg-background-tertiary rounded w-5/6 mb-4"></div>
      <div className="h-48 bg-background-tertiary rounded w-full"></div>
    </div>
  );
};

export default PostCardSkeleton;
