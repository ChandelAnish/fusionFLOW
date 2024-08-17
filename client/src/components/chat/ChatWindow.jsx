import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatsSliceAction } from '../../store/Chats';
import Message from './Message';
import './Chat.css';
import store from '../../store';
import Welcome from './Welcome';

const ChatWindow = ({reciver}) => {

    const inputMsg = useRef();
    const displayMsg = useRef();

    const chats = useSelector(store => store.chats)
    const dispatch = useDispatch();


    const handelKeyPress = (e) => {
        if (e.key === "Enter") {
            // console.log(inputMsg.current.value)
            // const msg = document.createElement('div');
            // msg.classList.add("d-flex", "mb-3");
            // //In React, className should be used instead of class for specifying classes. However, when you create HTML elements using JavaScript, you should use class instead of className.
            // msg.innerHTML = `<div class="p-3 bg-light-green rounded chat-message">
            //         <p className="mb-1">${inputMsg.current.value}</p>
            //             <div class="text-end text-muted timestamp">Yesterday, 13:34</div>
            //         </div>`
            // displayMsg.current.appendChild(msg);


            // console.log(chats.length)
            if(inputMsg.current.value.trim()===""){
                inputMsg.current.value = "";
                return
            }
            dispatch(chatsSliceAction.addChats(
                {
                    id: chats.length + 1,
                    sender: "anish",
                    reciver: "rahul",
                    msg: inputMsg.current.value.trim(),
                    time: "yesterday 12:05",
                }
            ))
            inputMsg.current.value = "";
        }
    }

    useEffect(() => {
        displayMsg.current.scrollTop = displayMsg.current.scrollHeight;
    }, [chats])

    return (
        <div className="container d-flex flex-column chat-container">
            <div className="p-3 border-bottom chat-header">
                <h5 className="mb-0">{reciver}</h5>
            </div>
            <div className="flex-grow-1 p-3 overflow-auto chat-messages" ref={displayMsg}>

                {/* <div className="d-flex mb-3">
                    <div className="p-3 bg-light-green rounded chat-message">
                        <p className="mb-1">This is a message.</p>
                        <div className="text-end text-muted timestamp">Yesterday, 13:34</div>
                    </div>
                </div> */}
                {(reciver)?chats.map((item) => <Message chat={item} key={item.id} />):<Welcome/>}

            </div>

            {/* chat input */}
            <div className="p-3 border-top">
                <input type="text" className="form-control rounded-pill" placeholder="Type a message" ref={inputMsg} onKeyUp={handelKeyPress} />
            </div>
        </div>
    );
};

export default ChatWindow;
