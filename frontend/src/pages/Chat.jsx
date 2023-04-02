import { useEffect, useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
import { allUsersRoutes,host } from "../util/APIroutes";
import Contacts from "../components/Contacts"
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";

function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [currentChat, setCurrentChat] = useState(undefined);
  const [notif, setNotif] = useState([])

  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (!user) {
        navigate('/login');
      } else {
        setCurrentUser(user);
      }
    };
    getUserFromLocalStorage();
  }, []);

  useEffect(()=>{
      if(currentUser){
        socket.current = io(host)
        socket.current.emit("add-user",currentUser._id)
      }
  },[currentUser])

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(`${allUsersRoutes}/${currentUser._id}`);
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, [currentUser._id]);

  const changeCurrentChat = (chat) => {
    setCurrentChat(chat);
  };


  const getNotif = ()=>{
    console.log(notif)
  }
  return ( 
    <div className="chat">
      <div className="container">
        <div className="nav">
          <Navbar/>
        </div>
        <Contacts contacts={contacts} currentUser={currentUser} changeCurrentChat={changeCurrentChat} />
        {
            currentChat === undefined ?
            <Welcome currentUser={currentUser}/>:
            <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
        }
      </div>
    </div> 
  );
}

export default Chat;