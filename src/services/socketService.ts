import toast from "react-hot-toast";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/env";
import type { SocketEvents } from "../redux/socketSlice";

class SocketService {
  private socket: Socket<SocketEvents> | null = null;
  private isInitialized = false;
  private connectionCallbacks: {
    onConnect?: () => void;
    onDisconnect?: (reason: string) => void;
    onError?: (error: Error) => void;
    onReconnect?: (attemptNumber: number) => void;
  } = {};

  initialize() {
    if (this.isInitialized || this.socket) {
      return this.socket;
    }

    const token = localStorage.getItem("token");

    this.socket = io(BASE_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      auth: token ? { token } : undefined,
    });

    this.isInitialized = true;

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
      this.connectionCallbacks.onConnect?.();
    });

    this.socket.on("disconnect", (reason: string) => {
      console.log("Socket disconnected:", reason);
      this.connectionCallbacks.onDisconnect?.(reason);
      if (reason === "io server disconnect") {
        this.socket?.connect();
      }
    });

    this.socket.on("connect_error", (error: Error) => {
      console.error("Socket connection error:", error);
      this.connectionCallbacks.onError?.(error);

      if (error.message.includes("Authentication")) {
        toast.error("Authentication failed. Please sign in again.");
      } else {
        toast.error("Connection lost. Retrying...");
      }
    });

    // Use the correct event names for socket.io
    (this.socket as any).on("reconnect", (attemptNumber: number) => {
      console.log(`Socket reconnected after ${attemptNumber} attempts`);
      this.connectionCallbacks.onReconnect?.(attemptNumber);
      toast.success("Connection restored");
    });

    (this.socket as any).on("reconnect_error", (error: Error) => {
      console.error("Socket reconnection error:", error);
      this.connectionCallbacks.onError?.(error);
    });

    (this.socket as any).on("reconnect_failed", () => {
      console.error("Socket reconnection failed");
      this.connectionCallbacks.onError?.(
        new Error("Failed to reconnect. Please refresh the page."),
      );
      toast.error("Connection failed. Please refresh the page.");
    });

    return this.socket;
  }

  getSocket() {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      console.log("Disconnecting socket");
      this.socket.disconnect();
      this.socket = null;
      this.isInitialized = false;
    }
  }

  setConnectionCallbacks(callbacks: typeof this.connectionCallbacks) {
    this.connectionCallbacks = callbacks;
  }

  isConnected() {
    return this.socket?.connected || false;
  }

  getSocketId() {
    return this.socket?.id || null;
  }
}

// Export singleton instance
export const socketService = new SocketService();
