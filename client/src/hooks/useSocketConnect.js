import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {io} from "socket.io-client";




export default function useSocketConnect() {

  const userDetails = useSelector((store) => store.userDetails);
  const [socket, setSocket] = useState("");

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

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}
