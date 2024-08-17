import React, { useState } from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';

export default function Chat() {

  const [reciver,setreciver] = useState('');

  const startChat =(rec)=>{
    setreciver(rec)
    console.log(rec)
  }


  return (
    <div className="d-flex" style={{ height: '87vh', width: '100%' }}>
      <Sidebar startChat={startChat} />
      <ChatWindow reciver={reciver} />
    </div>
  );
}
