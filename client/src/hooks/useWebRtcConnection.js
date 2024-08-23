import { useEffect, useRef, useState } from "react";
import useSocketConnect from "../hooks/useSocketConnect";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";


export default function useWebRtcConnection() {


  const receiver = useSelector((store) => store.receiver);
  const userDetails = useSelector((store) => store.userDetails);
  const [mystream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [socket] = useSocketConnect();
  const myVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [endCallBtn, setEndCallBtn] = useState(false);
  const [incomingOffer, setIncomingOffer] = useState(null);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {

    if (!socket) return;
    let pc;

    if (!pc) {
      pc = new RTCPeerConnection(iceServers);
    }
    setPeerConnection(pc);
    // console.log("pc = ", pc);


    //getting my media streams
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        currentStream.getTracks().forEach((track) => pc.addTrack(track, currentStream));
      });



    //socket.io listeners

    //offer
    socket.on("offer", async (data) => {
      if (data.receiver === userDetails.username) {
        // await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        // const answer = await pc.createAnswer();
        // await pc.setLocalDescription(answer);
        // socket.emit('answer', { answer, caller: userDetails.username, receiver });
        console.log("Incoming offer received:", data.offer);
        setIncomingOffer(data.offer);
      }
    });


    //answer
    socket.on("answer", async (data) => {
      if (data.receiver === userDetails.username) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
        setEndCallBtn(true);
        socket.emit("end-call-btn", { caller: userDetails.username, receiver });
      }
    });


    //sending ICE candidate
    socket.on("candidate", async (data) => {
      if (data.receiver === userDetails.username && data.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });


    //showing end call btn
    socket.on("end-call-btn", async (data) => {
      setEndCallBtn(true);
    });


    //call ended
    socket.on("call-ended", async (data) => {
      pc.close();
    });


    //event to listen any new ICE candidate and emit it
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", {candidate: event.candidate,caller: userDetails.username,receiver,});
      }
    };


    //display remote user
    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      remoteVideo.current.srcObject = event.streams[0];
    };


    return () => {
      pc.close();
      socket.disconnect();
    };
  }, [socket]);

  //function to create call offer
  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    console.log("offer = ", offer);
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { offer, caller: userDetails.username, receiver });
  };

  //function to end call
  const endCall = async () => {
    if (peerConnection) {
      socket.emit("call-ended", { caller: userDetails.username, receiver });
    }
  };

  // Function to answer an incoming call
  const answerCall = async () => {
    if (!incomingOffer) {
      console.error("No incoming offer to answer");
      return;
    }
    console.log("Answering call with offer:", incomingOffer);
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(incomingOffer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { answer, caller: userDetails.username, receiver });
    setEndCallBtn(true);
  };

  return [remoteVideo,myVideo,createOffer,endCallBtn,incomingOffer,answerCall,endCall];
}