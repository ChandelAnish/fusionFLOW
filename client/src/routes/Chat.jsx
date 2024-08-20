import React, { useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { chatsSliceAction } from '../store/Chats';
import useSocketConnect from '../hooks/useSocketConnect';

export default function Chat() {

  const dispatch = useDispatch()

  const userDetails = useSelector(store=>store.userDetails)
  const [receiver,setreceiver] = useState(null);

  //connect to socket server
  const socket = useSocketConnect()

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
