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
    console.log(onlineUsersMap)
    io.emit("online-users",onlineUsersMap)


    socket.on("send_message", (msg) => {
      if (onlineUsersMap[msg.receiver]) {
        io.to(onlineUsersMap[msg.receiver]).emit("received_message", msg);
      }
    });


    // video call

    socket.on('offer', (data) => {
      console.log("offer by ",data.caller," to ",data.receiver)
      io.to(onlineUsersMap[data.receiver]).emit('offer', data);
    });
    
    socket.on('answer', (data) => {
      console.log("answer by ",data.caller," to ",data.receiver)
      io.to(onlineUsersMap[data.receiver]).emit('answer', data);
    });
    
    socket.on('candidate', (data) => {
      // console.log("candidate ",data.username)
      io.to(onlineUsersMap[data.receiver]).emit('candidate', data);
    });  

    socket.on('end-call-btn', (data) => {
      io.to(onlineUsersMap[data.receiver]).emit('end-call-btn', data);
    });  

    socket.on('call-ended', (data) => {
      io.to(onlineUsersMap[data.caller]).emit('call-ended', data);
      io.to(onlineUsersMap[data.receiver]).emit('call-ended', data);
    });  

    // video call end

    socket.on("disconnect", () => {
      //update onlineUserMap
      for(key in onlineUsersMap){
        if(onlineUsersMap[key] === socket.id){
          delete onlineUsersMap[key];
          io.emit("online-users",onlineUsersMap)
          break;
        }
      }
      console.log(`${socket.id} user disconnected`);
      console.log(onlineUsersMap);
    });
  });
};

module.exports = socketConnection;
