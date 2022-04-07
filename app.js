import { io } from "socket.io-client";

const socket = io();

socket.emit("Hello from cardanonode-js", 5, "6", {7: Uint8Array.from([8])});

socket.on("Hello from explorer", (...agrs) => {});