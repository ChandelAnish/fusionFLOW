import React, { useEffect, useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import {io} from "socket.io-client";
import { chatsSliceAction } from '../store/Chats';

export default function Chat() {

  const dispatch = useDispatch()

  const userDetails = useSelector(store=>store.userDetails)
  const [receiver,setreceiver] = useState(null);

  const [socket,setSocket]=useState('')

  //socket.io
  useEffect(()=>{
    console.log("useEffect running ",userDetails)
    const socket =io("http://localhost:5000",{
      query:{
        username:userDetails.username
      }
    });

    setSocket(socket);

    socket.on("connect",()=>{
      console.log("connected ",socket.id)
    })

    return ()=>{
      socket.disconnect();
    }
  },[])

  const loadOrStartConversation = async(user1,user2)=>{
    try {
      const response = await fetch(`http://localhost:5000/chats/${user1}/${user2}`,{
          credentials:"include"
      });
      let initialChats = await response.json();
      if(initialChats.signin===false)
      {
          window.open('/signin', '_parent')
          return;
      }
      // console.log(initialChats)
      // console.log(initialChats.messages)
      dispatch(chatsSliceAction.addInitialChats(initialChats.messages))
  } catch (error) {
      console.log("error occurred : ", error)
      return [];
  }
  } 

  const startChat =async(rec)=>{
    setreceiver(rec)
    await loadOrStartConversation(userDetails.username,rec)
    // console.log(rec)
  }


  return (
    <div className="d-flex" style={{ height: '87vh', width: '100%' }}>
      <Sidebar startChat={startChat} />
      <ChatWindow sender={userDetails.username} receiver={receiver} socket={socket} />
    </div>
  );
}
