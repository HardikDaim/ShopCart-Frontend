// utils.js
import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://shop-cart-backend-green.vercel.app"
    : "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"], 
  reconnectionAttempts: 5,
});
