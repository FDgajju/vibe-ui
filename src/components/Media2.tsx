import type React from "react";
import { useState } from "react";
import type { MediaT } from "../types/types";
import DisplayImage from "./DisplayImage";

type MediaProps = {
  media: MediaT[];
};

const Media: React.FC<MediaProps> = ({ media }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!media || media.length === 0) return null;

  const handlePreview = (url: string) => setPreviewUrl(url);
  const closePreview = () => setPreviewUrl(null);

  // single media
  if (media.length === 1) {
    const m = media[0];
    return (
      <div className="w-full">
        {m.type.startsWith("image") ? (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <img
            src={m.url}
            alt={m.name}
            className="w-full h-auto object-cover cursor-pointer rounded-xl"
            onClick={() => handlePreview(m.url)}
          />
        ) : m.type.startsWith("video") ? (
          // biome-ignore lint/a11y/useMediaCaption: <explanation>
          <video src={m.url} controls className="w-full h-auto rounded-xl" />
        ) : null}

        {previewUrl && (
          <DisplayImage url={previewUrl} handleClose={closePreview} />
        )}
      </div>
    );
  }

  //multiple media
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full">
      {media.map((m) =>
        m.type.startsWith("image") ? (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <img
            key={m.key}
            src={m.url}
            alt={m.name}
            className="h-64 w-auto object-cover cursor-pointer rounded-xl flex-shrink-0"
            onClick={() => handlePreview(m.url)}
          />
        ) : m.type.startsWith("video") ? (
          // biome-ignore lint/a11y/useMediaCaption: <explanation>
          <video
            key={m.key}
            src={m.url}
            controls
            className="h-64 w-auto rounded-xl flex-shrink-0"
          />
        ) : null,
      )}

      {previewUrl && (
        <DisplayImage url={previewUrl} handleClose={closePreview} />
      )}
    </div>
  );
};

export default Media;
