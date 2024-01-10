import React from 'react'
import { useEffect, useState } from 'react';
import {socket,userid}  from './Initialstate';

function Chat() {
    const [msg, setmsg] = useState('');
    const [chat, setchat] = useState([]);
    const sendchat = (e) => {
      e.preventDefault();
      socket.emit("chat", { msg ,username:userid});
      setmsg("");
    }

    useEffect(() => {
        socket.on("chat", (payload) => {
          setchat([...chat, payload])
        })
      });

  return (
     <div className="left">
        <div className="chatbox">
          <form onSubmit={sendchat}>
            <input type='text' name="chat" value={msg} onChange={(e) => { setmsg(e.target.value) }}

            />
            <button type="submit">submit</button>
          </form>
        </div>
        <div className="chatlog">
          {
            chat.map((payload, index) => {
              return (<div className="chatline"  key={index}>{userid===payload.username&&<span className='username'>id :{payload.username}</span>}<p className='text'>{payload.msg}</p>{userid!==payload.username&&<span className='username'>id :{payload.username}</span>}</div>)
            })
          }
        </div>


      </div> 

  )
}

export default Chat
