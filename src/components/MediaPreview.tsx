import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type MediaPreviewProps = {
  url: string;
  className?: string;
  style?: React.CSSProperties;
};

const MediaPreview: React.FC<MediaPreviewProps> = ({
  url,
  className,
  style,
}) => {
  const [blobType, setBlobType] = useState<string | null>(null);
  const [error, _setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadBlob = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const blob = await response.blob();
        setBlobType(blob.type);
      } catch (_error) {
        toast.error("Failed to fetch media");
      }
    };

    loadBlob();

    return () => {
      controller.abort();
    };
  }, [url]);

  const isVideo = blobType?.startsWith("video");

  if (error) {
    return <div className="text-red-500">Failed to load media</div>;
  }

  if (!blobType) {
    return <div className="text-gray-400">Loading...</div>;
  }

  return isVideo ? (
    <video
      src={url}
      autoPlay
      loop
      muted
      playsInline
      controls
      className={className}
      style={style}
    />
  ) : (
    <img src={url} alt="Preview" className={className} style={style} />
  );
};

export default MediaPreview;
