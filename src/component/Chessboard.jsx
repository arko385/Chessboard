
import React, { useRef, useState, useEffect } from 'react';
import Tile from './Tile';
import { Pieces } from './Initialstate';
import Referee from '../referee/Referee';


function Chessboard() {

    const chessboardref = useRef(null);
    const [Boardstate, setboardstate] = useState(Pieces); // contain the array which refer to the postion of the current pices
    const [gridx, setgridx] = useState(-1);
    const [gridy, setgridy] = useState(-1);
    const [activePiece ,setactivepiece]=useState(null);
    const referee=new Referee();


    const grabPiece = (e) => {
        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;
        let ypos=Math.floor((e.clientX-minx)/(width/8));
        let xpos=Math.floor((e.clientY-miny)/(width/8));
        const element = e.target;
        if (element.classList.contains("chess_piece")) {
       
            setactivepiece(element);
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
            // activePiece.style.position = "absolute";
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
            let ypos = Math.floor((e.clientX - minx) / (width / 8));
            let xpos = Math.floor((e.clientY - miny) / (width / 8));
           
            
                setboardstate((value)=>{
                    const boardstate= value.map((p) => {
                        if (p.x === gridx && p.y === gridy) {
                            const check=referee.isValidmove(gridx,gridy,xpos,ypos,p.type,p.playertype,Boardstate);
                            if(check)
                            {

                                p.x=xpos;p.y=ypos;
                            }
                            else
                            {
                               activePiece.style.removeProperty("top");
                               activePiece.style.removeProperty("left");

                            }
                        }
                     
                            return p;
        
                    });
                    return boardstate;
                });
                setactivepiece(null);
            
       
        }
    }

    const board = [];

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




    return (
        <div ref={chessboardref} className='chessboard'
            onMouseDown={grabPiece}
            onMouseMove={movePiece}
            onMouseUp={leavePiece}


        >{board}</div>
    )
}

export default Chessboard
