const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const roomSocket = require("./sockets/roomSocket");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());

const server = app.listen(5000, () => {
  console.log("Server running on port: " + 5000);
});

app.get("/api/create-room", (req, res) => {
    const roomId = uuidv4();
    res.json({roomId});
})

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

roomSocket(io);
