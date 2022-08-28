// Socket IO Client
import { io } from "socket.io-client";

const API = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");
export default API;
