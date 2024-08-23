import React, { useEffect, useRef, useState } from 'react'
// import useSocketConnect from '../hooks/useSocketConnect'
// import { io } from "socket.io-client";
// import { useSelector } from 'react-redux';
import useWebRtcConnection from '../hooks/useWebRtcConnection';
import { IoMdCall } from "react-icons/io";
import { HiPhoneIncoming } from "react-icons/hi";
import { MdOutlineCallEnd } from "react-icons/md";

export default function VideoCall({setVideoCall}) {

  const returnToChat=()=>{
    setVideoCall(false);
  }

  const [remoteVideo, myVideo, createOffer, endCallBtn, incomingOffer, answerCall, endCall] = useWebRtcConnection()

  return (
    <div className='w-100'>
      <div>
        <video ref={remoteVideo} autoPlay className='w-100' style={{ backgroundColor: "black" }}></video>
        <video ref={myVideo} autoPlay style={{ width: "15rem", position: "absolute", left: "19rem", top: "5rem", border: "2px solid black" }}></video>
        <IoMdCall onClick={createOffer} className='callbtn' />
        {!endCallBtn && incomingOffer && <HiPhoneIncoming onClick={answerCall} className='incomingCall' />}
        {endCallBtn && <MdOutlineCallEnd onClick={()=>{endCall();returnToChat()}} className='endCall'/>}
      </div>
    </div>
  )
}
