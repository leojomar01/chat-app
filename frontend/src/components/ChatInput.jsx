import React, { useState } from 'react';
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from 'emoji-picker-react';

export default function ChatInput({handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  };
  
  return (
    <div className='buttonContainer'>
      <div className="emoji">
          <BsEmojiSmileFill className='icon' onClick={handleEmojiPickerShow} />
          {showEmojiPicker && <div className="picker"><Picker  onEmojiClick={(emojiObject)=> setMessage((message)=> message + emojiObject.emoji)}/></div> }
      </div>
      <form className='inputContainer' onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className='submit'>Send</button>
      </form>
    </div>
  );
}
