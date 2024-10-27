import React, { useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { chatsSliceAction } from '../store/Chats';
import useSocketConnect from '../hooks/useSocketConnect';
import { receiverSliceAction } from '../store/Reciever';
import VideoCall from './VideoCall';

export default function Chat() {

  const [videoCall,setVideoCall]=useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(store=>store.userDetails)
  // const [receiver,setReceiver] = useState(null);
  const receiver = useSelector(store=>store.receiver)

  //connect to socket server
  const [socket,onlineUsers] = useSocketConnect()

  const loadOrStartConversation = async(user1,user2)=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats/${user1}/${user2}`,{
          credentials:"include"
      });
      let initialChats = await response.json();
      if(initialChats.signin===false)
      {
          // window.open('/signin', '_parent')
          window.open('https://fusionflow-signin.onrender.com', '_parent')
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
    dispatch(receiverSliceAction.setReceiver(rec))
    // setReceiver(rec)
    await loadOrStartConversation(userDetails.username,rec)
    // console.log(rec)
    // console.log(onlineUsers)
  }


  return (
    <div className="d-flex" style={{ height: '90%', width: '100%', overflowY:"hidden" }}>
      {(!videoCall) && <Sidebar startChat={startChat} onlineUsers={onlineUsers} />}
      {(!videoCall) && <ChatWindow sender={userDetails.username} socket={socket} setVideoCall={setVideoCall} />}
      {(videoCall) && <VideoCall setVideoCall={setVideoCall} />}
    </div>
  );
}
