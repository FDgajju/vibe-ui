import type React from "react";
import type { MediaT } from "../types/types";

const Media: React.FC<{ media: MediaT[] }> = ({ media }) => {
  console.log(media);

  return (
    <div className="w-full">
      {media.map((item) => (
        <div
          key={item.url}
          className="relative w-full overflow-hidden bg-gray-100"
        >
          {item.type.startsWith("image/") ? (
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : item.type.startsWith("video/") ? (
            <video
              controls
              className="w-full h-full object-cover"
              src={item.url}
            >
              <track kind="captions"></track>
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-500">
              Unsupported media
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Media;
