import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {io} from "socket.io-client";




export default function useSocketConnect() {

  const userDetails = useSelector((store) => store.userDetails);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    console.log("useEffect running ", userDetails);
    const socket = io("http://localhost:5000", {
      query: {
        username: userDetails.username,
      },
    });

    setSocket(socket);

    socket.on("connect", () => {
      console.log("connected ", socket.id);
    });

    //online-users
    socket.on("online-users", (data) => {
      setOnlineUsers(data);
      // console.log("online users ", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return [socket,onlineUsers];
}
