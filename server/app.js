require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/router");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
//socket io
const { createServer } = require('http')
const { Server } = require('socket.io')

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials:true
  })
);

//socket io
const server = createServer(app)

const io = new Server(server,{
  cors:{
      origin:'http://localhost:5173',
      methods:["GET","POST"],
      credentials: true
  }
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);


//socket io
const onlineUsersMap = {};
io.on("connection",(socket)=>{

  const username = socket.handshake.query.username;
  console.log(username," connected with ID : ",socket.id)

  onlineUsersMap[username]=socket.id;
  
  socket.on("send_message",(msg)=>{
    // console.log(msg)
    io.to(onlineUsersMap[msg.receiver]).emit("received_message",msg);
  })


  socket.on("disconnect",()=>{
      console.log(`${socket.id} user disconnected`)
  })

})


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log("Server listening at PORT and connected to DB", port);
    });
  } catch (error) {
    console.log("error occurred : ", error);
  }
};
start();
