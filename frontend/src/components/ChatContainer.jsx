import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import axios from 'axios';
import { getAllMessagesRoutes, sendMessagesRoutes } from '../util/APIroutes';
import {v4 as uuidv4} from "uuid";

export default function ChatContainer({currentUser,currentChat,socket }) {
    const [messages,setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    const [notification, setNotification] = useState([]);
    useEffect(() => {
        if(currentChat){
            const fetchData = async () => {
                try {
                  const response  = await axios.post(getAllMessagesRoutes, {
                    from: currentUser._id,
                    to: currentChat._id,
                  });
                  setMessages(response.data);
                } catch (error) {
                  console.error(error);
                }
              };
              fetchData();
        }
}, [currentChat]);
      

    const handleSendMsg = async(message)=>{

        await axios.post(sendMessagesRoutes,{
            from:currentUser._id,
            to:currentChat._id,
            message: message
        })

        socket.current.emit("send-message",{
            to:currentChat._id,
            from:currentUser._id,
            message:message
        })

        const msgs = [...messages];
        msgs.push({fromSelf:true,messages:message});
        setMessages(msgs);
    }

    useEffect(() => {
        if (socket.current) {
          socket.current.on("message-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, messages: msg });
          });
        }
      }, []);
      

      useEffect(() => {
        if (arrivalMessage) {
          setMessages((prev) => [...prev, arrivalMessage]);
          setNotification((prev) => ([...prev,arrivalMessage]));
        }
      }, [arrivalMessage]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    
   
  return (
    <div className='ChatContainer'> 
        <div className="chatHeader">
            <div className="userDetails">
                <div  className="avatar">
                  <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt="icon" />
                </div>
                <div className="username">
                  <h3>{currentChat.username}
                </h3>
            </div>
            </div>
        </div>
        <div className="chatMessages">
            {
                messages.map((message)=>{
                  return(
                      <div ref={scrollRef} key={uuidv4()} >
                           <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                              <div className="content">
                                  <p>{message.messages}</p>
                              </div>
                          </div>
                      </div>
                  )
              })
            }
            
        </div>
        <div className="chatInput">
            <ChatInput handleSendMsg={handleSendMsg}/>
        </div>
    </div>
  )
}
