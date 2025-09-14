import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  resetSocket,
  setConnectionError,
  setConnectionStatus,
  setSocketId,
} from "../redux/socketSlice";
import type { RootState } from "../redux/store";
import { socketService } from "../services/socketService";

export const useSocket = () => {
  const dispatch = useDispatch();
  const { isConnected, connectionError, isInitialized, socketId } = useSelector(
    (state: RootState) => state.socket,
  );

  useEffect(() => {
    if (isInitialized) return;

    dispatch(initializeSocket());

    // Initialize socket service
    socketService.initialize();

    // Set up connection callbacks
    socketService.setConnectionCallbacks({
      onConnect: () => {
        dispatch(setConnectionStatus(true));
        dispatch(setConnectionError(null));
        dispatch(setSocketId(socketService.getSocketId()));
      },
      onDisconnect: () => {
        dispatch(setConnectionStatus(false));
        dispatch(setSocketId(null));
      },
      onError: (error) => {
        dispatch(setConnectionStatus(false));
        dispatch(setConnectionError(error.message));
      },
      onReconnect: () => {
        dispatch(setConnectionStatus(true));
        dispatch(setConnectionError(null));
        dispatch(setSocketId(socketService.getSocketId()));
      },
    });

    // Cleanup function
    return () => {
      // Don't disconnect here as other components might still be using the socket
    };
  }, [dispatch, isInitialized]);

  // App-level cleanup
  useEffect(() => {
    return () => {
      socketService.disconnect();
      dispatch(resetSocket());
    };
  }, [dispatch]);

  return {
    socket: socketService.getSocket(),
    isConnected,
    connectionError,
    socketId,
  };
};
