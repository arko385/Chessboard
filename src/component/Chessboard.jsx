
import React, { useRef, useState, useEffect } from 'react';
import Tile from './Tile';
import { Pieces, socket, userid } from './Initialstate';
import Referee from '../referee/Referee';




function Chessboard() {

    const chessboardref = useRef(null);
    const [Boardstate, setboardstate] = useState(Pieces); // contain the array which refer to the postion of the current pices
    const [gridx, setgridx] = useState(-1);
    const [gridy, setgridy] = useState(-1);
    const [activePiece, setactivepiece] = useState(null);
    const [roomname, setroomname] = useState("");
    const [color, setcolor] = useState();
    const [canmove, setcanmove] = useState(false);
    const referee = new Referee();




    const grabPiece = (e) => {
        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;
        const element = e.target;
        if (element.classList.contains("chess_piece")) {

            setactivepiece(element);
            let ypos,xpos;
            if(color==='w')
            {
                ypos = Math.floor((e.clientX - minx) / (width / 8));
                xpos = Math.floor((e.clientY - miny) / (width / 8));
            }
            else
            {

                ypos = Math.floor(((minx+width)-e.clientX) / (width / 8));
                xpos = Math.floor(((miny+width) -e.clientY) / (width / 8));
            }
            
             
            let x = e.clientX - minx - 35;
            let y = e.clientY - miny - 35;
            setgridx(xpos);
            setgridy(ypos);


            if (x < 0) {
                x = 0;
            }
            if (x > width - 75) {
                x = width - 75;
            }
            if (y < 0) {
                y = 0;
            }
            if (y > width) {
                y = width - 75;
            }

            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;


        }

    }


    const movePiece = (e) => {

        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;


        if (activePiece !== null) {

            let x = e.clientX - minx - 35;
            let y = e.clientY - miny - 35;
            if (x < 0) {
                x = 0;
            }
            if (x > width - 75) {
                x = width - 75;
            }
            if (y < 0) {
                y = 0;
            }
            if (y > width) {
                y = width - 75;
            }
            activePiece.style.position = "absolute";
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;

        }

    }

    const leavePiece = (e) => {

        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;

        if (activePiece !== null) {

            // Inscreen horizontal is considered as x-axis but in my board i standard the  horizontal as y axis or (j)
            // let ypos = Math.floor((e.clientX - minx) / (width / 8));
            // let xpos = Math.floor((e.clientY - miny) / (width / 8));
            let ypos,xpos;
            if(color==='w')
            {
                ypos = Math.floor((e.clientX - minx) / (width / 8));
                xpos = Math.floor((e.clientY - miny) / (width / 8));
            }
            else
            {

                ypos = Math.floor(((minx+width)-e.clientX) / (width / 8));
                xpos = Math.floor(((miny+width) -e.clientY) / (width / 8));
            }

            const currentpiece = Boardstate.find((p) => p.x === gridx && p.y === gridy);
            if (currentpiece) {
                const isvalid = referee.isValidmove(gridx, gridy, xpos, ypos, currentpiece.type, currentpiece.playertype, Boardstate);
                
                if (canmove&& isvalid && currentpiece.color === color) {

                    const boardstate = Boardstate.reduce((accumulator, p) => {
                        if (p.x === gridx && p.y === gridy) {
                            const updatedElement = { ...p, x: xpos, y: ypos };
                            accumulator.push(updatedElement);
                        }
                        else if (!(p.x === xpos && p.y === ypos)) {
                            // it will not push that piece which will be attacked by the valid move
                            accumulator.push(p);
                        }
                        return accumulator;
                    }, []);

                    setboardstate(boardstate);
                    setcanmove(false);
                    socket.emit("move", boardstate);

                }
                else {
                    //Reset piece position if move is not valid
                    activePiece.style.removeProperty("top");
                    activePiece.style.removeProperty("left");
                }

            }
            else {
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");

            }

            setactivepiece(null);


        }
    }

    //##############################################################################################################

    socket.on('color', (msg) => {
        setcolor(msg);
        if (msg === 'w')
            setcanmove(true);
        console.log(msg);

    });

    


         
        socket.on('movedone', (senderId, payload) => {
        setcanmove(true);
        setboardstate(payload);
       // console.log(canmove," prev move",senderId);

         });

        //chat implement later
        socket.on("chatroom", (payload) => {
            console.log(payload);
        })

    

  


    const board = [];


    //##############################################################################################################
    
     if(color==='w')
     {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let image = null;
                Boardstate.forEach(p => {
                    if (p.x === i && p.y === j)
                        image = p.image;
                })
                const number = (i + j) % 2;
                board.push(<Tile key={`${i}*10+${j}`} image={image} number={number} />);
            }
    
        }
     }
       
    else
    {

        for (let i = 7; i >=0; i--) {
            for (let j = 7; j >=0; j--) {
                let image = null;
                Boardstate.forEach(p => {
                    if (p.x === i && p.y === j)
                        image = p.image;
                })
                const number = (i + j) % 2;
                board.push(<Tile key={`${i}*10+${j}`} image={image} number={number} />);
            }
    
        }
    }
   




    return (
        <div className='container'>

            <div ref={chessboardref} className='chessboard'
                onMouseDown={grabPiece}
                onMouseMove={movePiece}
                onMouseUp={leavePiece}
                onMouseLeave={leavePiece}
            >{board}</div>
        </div>

    )
}

export default Chessboard
