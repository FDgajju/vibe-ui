import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostT } from "../types/types";

interface PostsState {
  posts: PostT[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostT[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePostReaction: (
      state,
      action: PayloadAction<{ postId: string; isReacted: boolean }>,
    ) => {
      const { postId, isReacted } = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.isReacted = isReacted;
      }
    },
    togglePostReaction: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const post = state.posts.find((p) => p._id === postId);
      if (post) {
        post.isReacted = !post.isReacted;

        if (!post.isReacted) post.likes = (post.likes as number) - 1;
        else post.likes = (post.likes as number) + 1;
      }
    },
  },
});

export const {
  setPosts,
  setLoading,
  setError,
  updatePostReaction,
  togglePostReaction,
} = postsSlice.actions;
export default postsSlice.reducer;
