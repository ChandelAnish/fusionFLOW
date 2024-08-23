import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatsSliceAction } from '../../store/Chats';
import Message from './Message';
import './Chat.css';
import Welcome from './Welcome';
import { v4 as uuid } from 'uuid';
import { FaVideo } from "react-icons/fa";
import { Link } from 'react-router-dom';
import usePatchChatArray from '../../hooks/usePatchChatArray';

const ChatWindow = ({ sender,socket,setVideoCall}) => {

    const mutation = usePatchChatArray()//

    const inputMsg = useRef();
    const displayMsg = useRef();

    const chats = useSelector(store => store.chats)
    const receiver = useSelector(store=>store.receiver)
    const dispatch = useDispatch();

    const displayVideo=()=>{
        setVideoCall(true)
    }

    //receiving chat
    useEffect(() => {
        if (socket) {
            // console.log(socket)
            socket.on("received_message", (msg) => {
                msg.id = uuid();
                // console.log(msg);
                dispatch(chatsSliceAction.receiveChat(msg));
            })
        }
        return ()=>{
            if (socket) {
                socket.removeListener("received_message", () => {
                    console.log("turned off received_message event");
                });
            }
        }
    }, [socket])


    //send message
    const handelKeyPress = async (e) => {
        if (e.key === "Enter") {

            if (inputMsg.current.value.trim() === "") {
                inputMsg.current.value = "";
                return
            }
            const message = {
                id: uuid(),
                sender: sender,
                receiver: receiver,
                msg: inputMsg.current.value.trim(),
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            
            //patching this chat into the message array in DB
            mutation.mutate(message);
            // dispatch(chatsSliceAction.sendChat(message))
            await socket.emit("send_message", message)
            inputMsg.current.value = "";
        }
    }

    useEffect(() => {
        displayMsg.current.scrollTop = displayMsg.current.scrollHeight;
    }, [chats])

    return (
        <div className="container d-flex flex-column chat-container">
            <div className="p-3 border-bottom chat-header">
                {/* <h5 className="mb-0 clearfix">{receiver} <Link to="/videocall"><FaVideo className='fs-4 float-end' style={{color:"#803bbf",cursor:"pointer"}} /></Link></h5> */}
                <h5 className="mb-0 clearfix">{receiver} {(receiver) && <FaVideo onClick={displayVideo} className='fs-4 float-end' style={{color:"#803bbf",cursor:"pointer"}} />}</h5>
            </div>
            <div className="flex-grow-1 p-3 overflow-auto chat-messages" ref={displayMsg}>

                {/* <div className="d-flex mb-3">
                    <div className="p-3 bg-light-green rounded chat-message">
                        <p className="mb-1">This is a message.</p>
                        <div className="text-end text-muted timestamp">Yesterday, 13:34</div>
                    </div>
                </div> */}
                {(receiver) ? chats.map((item) => <Message chat={item} key={item.id} sender={sender} receiver={receiver} />) : <Welcome />}

            </div>

            {/* chat input */}
            <div className="p-3 border-top">
                <input type="text" className="form-control rounded-pill" placeholder="Type a message" ref={inputMsg} onKeyUp={handelKeyPress} disabled={!receiver ? true : false} />
            </div>
        </div>
    );
};

export default ChatWindow;
