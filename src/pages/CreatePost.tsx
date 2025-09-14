import { AxiosError } from "axios";
import type React from "react";
import { type ChangeEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MediaPreview from "../components/MediaPreview";
// import Button from "../components/Button";
import api from "../services/api";
import type { MediaT, PostT } from "../types/types";

const CreatePost: React.FC = () => {
  const [files, setFiles] = useState<Partial<MediaT>[]>([]);
  const [mediasToUpload, setMediasToUpload] = useState<File[]>([]);
  const visibleFiles = useMemo(() => files, [files]);
  const [post, setPost] = useState<Partial<PostT>>({});
  const navigate = useNavigate();

  const [charCount, setCharCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleOnFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.[0]) {
      const file = e.target.files?.[0];
      if (file) {
        setFiles((prev: Partial<MediaT>[]) => {
          return [
            ...prev,
            {
              maskImageUrl: URL.createObjectURL(file),
              id: `${Date.now()}-${Math.trunc(Math.random() * 1000)}`,
              name: file.name,
            },
          ];
        });
        setMediasToUpload([file, ...mediasToUpload]);
      }
      e.target.value = "";
    } else {
      console.log("No file chosen");
    }
  };

  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "content") setCharCount(value.length);

    setPost((p) => ({ ...p, [name]: value }));
  };

  const handleOnPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!post.content && !files.length) {
      toast.error("Failed to Create Post, please add content, media");
      setLoading(false);
      return;
    }

    if (post.content && post.content.length > 280) {
      toast.error("The caption content length exceed, max character is 280");
      setLoading(false);
      return;
    }

    files.forEach((f) => {
      URL.revokeObjectURL(f.maskImageUrl as string);
    });
    const uploadedMediaIds = [];

    try {
      for (const med of mediasToUpload) {
        const formData = new FormData();

        formData.append("file", med as File);

        const resp = await api.post(`/file`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedMediaIds.push(resp.data.data._id);
      }

      post.media = uploadedMediaIds;
      const postResp = await api.post("/post", post);

      if (postResp.status === 201) {
        navigate("/feed");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error.message || error.message);
      } else {
        toast.error(
          "An unknown error occurred while creating the post, failed to create post",
        );
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-md bg-background-secondary rounded-xl shadow-theme ring-1 ring-border p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6">
          Create Post
        </h1>
        <form className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-secondary"
            >
              title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title || ""}
              onChange={handleOnchange}
              className="block w-full rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              placeholder="Title (Optional)"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-secondary"
            >
              Content
            </label>
            <textarea
              name="content"
              value={post.content || ""}
              id="content"
              onChange={handleOnchange}
              className="block w-full h-50 rounded-md border-default shadow-theme focus:border-primary focus:ring-primary py-2.5 px-3"
              placeholder="Add caption..."
            />

            <p className="flex justify-between space-between text-xs font-semibold text-tertiary">
              <span>Only 280 character allowed</span>
              <span>{charCount}</span>
            </p>
          </div>

          <div
            className="relative rounded-3xl flex flex-col items-center p-4 gap-3 border-1 border-default"
            // onDragOver={handleDragging}
            // onDragLeave={handleDragLeave}
            // onDrop={handleDrop}
          >
            {/* {isDragging && (
          <div className="absolute inset-0 bg-btn-secondary/65 border-1 border-btn-primary rounded-3xl flex items-center justify-center pointer-events-none text-btn-primary font-bold text-xl z-10">
            Drop file here to upload!
          </div>
        )} */}
            {visibleFiles && visibleFiles?.length !== 0 && (
              <div className="flex flex-nowrap gap-2 justify-start w-full items-center overflow-x-auto">
                {visibleFiles?.map((f) => (
                  <div
                    key={f._id || f.name || f.originalname}
                    className="min-w-[200px] relative p-2"
                  >
                    <MediaPreview
                      className={`h-50 w-[200px] flex items-center justify-center bg-background-tertiary rounded-md object-cover object-center`}
                      url={f.maskImageUrl || ""}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm text-tertiary flex gap-2">
              <label htmlFor="files" className="font-bold text-tertiary">
                Add Media
              </label>
              <input
                type="file"
                onChange={handleOnFileUpload}
                id="files"
                name="file"
                className="hidden bg-warning-light"
                // multiple
              />
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-background-secondary text-primary-color shadow-theme hover:bg-primary-lightest inline-flex items-center rounded-md font-semibold px-4 py-2.5 transition w-full justify-center focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary"
            disabled={loading}
            onClick={handleOnPost}
          >
            {!loading ? "Post" : "Posting..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
