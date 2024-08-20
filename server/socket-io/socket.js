const { Server } = require("socket.io");

const onlineUsersMap = {};

const socketConnection = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    console.log(username, "connected with ID : ", socket.id);

    onlineUsersMap[username] = socket.id;

    socket.on("send_message", (msg) => {
      if (onlineUsersMap[msg.receiver]) {
        io.to(onlineUsersMap[msg.receiver]).emit("received_message", msg);
      }
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} user disconnected`);
      // Optionally, you can remove the user from onlineUsersMap on disconnect
    });
  });
};

module.exports = socketConnection;
