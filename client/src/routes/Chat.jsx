import React from 'react';
import Sidebar from '../components/chat/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';

export default function Chat() {
  return (
    <div className="d-flex" style={{ height: '87vh', width: '100%' }}>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
