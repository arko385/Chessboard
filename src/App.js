
import './App.css';

import Chat from './component/Chat';
import React, { useState  } from 'react';
import { userid, socket } from './component/Initialstate';
import { Redirect,useNavigate } from 'react-router-dom';
import bg from './component/bg.png'



function App() {

  const [roomname,setroomname]=useState("");
  const navigate = useNavigate();
  const [btnclicked,setbtnclicked]=useState(false);
  const createroom = (e) => {
    console.log("firing");
    socket.emit("createroom");
    setbtnclicked(!btnclicked);
  };
  socket.on('roomCreated', (room) => {
    console.log(room);
    setroomname(room);
    navigate('chessboard');
    
  });


  return (
    <div className="app"  style={{ backgroundImage:`url(${bg})`}} >
      {!btnclicked&&<button  className="play" onClick={createroom}>Start</button>}
      {btnclicked&&<h1>Waiting</h1>}
    </div>
  );
}

export default App;
