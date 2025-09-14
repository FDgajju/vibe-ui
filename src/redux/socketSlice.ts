import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { UserT } from "../types/types";

// Define socket event types for type safety
export interface SocketEvents {
  // Client to server events
  joinPostRoom: (postId: string) => void;
  leavePostRoom: (postId: string) => void;
  likePost: (data: { post: string; reaction: string; user: string }) => void;
  commentPost: (data: { post: string; comment: string; by: string }) => void;

  // Server to client events
  updateLikes: (data: {
    postId: string;
    user: string;
    newLikesCount: number;
    isReacted: boolean;
  }) => void;
  commentAdded: (comment: {
    _id: string;
    comment: string;
    createdAt: string;
    by: Partial<UserT>;
  }) => void;
}

interface SocketState {
  isConnected: boolean;
  connectionError: string | null;
  isInitialized: boolean;
  socketId: string | null;
}

const initialState: SocketState = {
  isConnected: false,
  connectionError: null,
  isInitialized: false,
  socketId: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state) => {
      state.isInitialized = true;
    },

    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    setConnectionError: (state, action: PayloadAction<string | null>) => {
      state.connectionError = action.payload;
    },

    setSocketId: (state, action: PayloadAction<string | null>) => {
      state.socketId = action.payload;
    },

    resetSocket: (state) => {
      state.isConnected = false;
      state.connectionError = null;
      state.isInitialized = false;
      state.socketId = null;
    },
  },
});

export const {
  initializeSocket,
  setConnectionStatus,
  setConnectionError,
  setSocketId,
  resetSocket,
} = socketSlice.actions;

export default socketSlice.reducer;
