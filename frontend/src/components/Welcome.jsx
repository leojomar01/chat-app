import React from 'react';

export default function Welcome({ currentUser }) {

  return (
    <div className='welcome'>
      <h2>
        Welcome, {currentUser.username}!
      </h2>

      <img src="https://img.freepik.com/premium-vector/cute-friendly-smiling-robot-character-greets-futuristic-white-chatbot-mascot-speech-bubble-tech-cartoon-online-bot-communication-robotic-ai-assistance-talk-vector-isolated-illustration_502272-735.jpg?w=740" alt="" />
    </div>
  );
}
