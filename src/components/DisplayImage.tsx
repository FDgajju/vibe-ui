import type React from "react";
import { useEffect, useRef } from "react";

type DisplayImageProps = {
  url: string;
  handleClose: () => void;
};

const DisplayImage: React.FC<DisplayImageProps> = ({ url, handleClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // focus close button on mount
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div role="document" className="relative max-w-5xl max-h-[90vh] p-4">
        {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md text-sm"
        >
          Close
        </button>

        {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClose();
          }}
          className="block"
        >
          <img
            src={url}
            alt="Preview"
            className="max-h-[80vh] max-w-full rounded-xl shadow-lg object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default DisplayImage;
