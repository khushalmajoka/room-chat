const roomSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room: ${roomId}`);
    });

    socket.on("send-message", (data) => {
      io.to(data.roomId).emit("receive-message", data);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = roomSocket;
