import React, { useEffect, useRef, useState } from 'react'
import useSocketConnect from '../hooks/useSocketConnect'


export default function VideoCall() {

  const [stream,setStream] = useState(null)
  const socket = useSocketConnect();
  const myVideo = useRef();

  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({video:true,audio:true})//it returns a promise that resolves with a MediaStream object containing the video and audio.
    .then((currentStream)=>{
      setStream(currentStream);//currentStream contains the audio and/or video tracks coming from the user's webcam and microphone.
      myVideo.current.srcObject = currentStream;//srcObject is a property of media elements (<video>, <audio>, etc.) that allows you to set a MediaStream, MediaSource, Blob, or File directly as the source for the media element.
      //The srcObject property was introduced to make it easier to directly assign streams to media elements, simplifying the process of playing live video or audio content in the browser.

      //The currentStream (which is the media stream from the user's camera and microphone) is being assigned to the srcObject of the video element referred to by myVideo.current. This causes the video element to play the video feed from the webcam.
    })
  },[])

  return (
    <>
      {/* <video ref={myVideo} autoPlay className='w-100'></video>    */}
      <video ref={myVideo} autoPlay style={{width:"15rem",position:"absolute",left:"19rem",top:"5rem",border:"2px solid black"}}></video> 
      {/* The autoplay attribute in the <video> tag automatically starts playing the video as soon as it is ready, without requiring the user to press the play button. */}
    </>
  )
}