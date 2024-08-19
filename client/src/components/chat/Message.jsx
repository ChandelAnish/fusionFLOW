import React from 'react'

export default function Message({ chat ,sender,receiver}) {
  return (
    <div className="mb-3 clearfix">
      <div className={`p-3 ${(chat.sender === sender)?'bg-light-green float-end':'bg-body-secondary float-start'} rounded chat-message`}>
        <p className="mb-1">{chat.msg}</p>
        <div className="text-end text-muted timestamp">{chat.time}</div>
      </div>
    </div>
  )
}