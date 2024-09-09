
import React, { useRef, useState, useEffect } from 'react';
import Tile from './Tile';
import { Pieces, socket, userid, Promotionpieces } from './Initialstate';
import Referee from '../referee/Referee';




function Chessboard() {

    const chessboardref = useRef(null);
    const promotionref = useRef(null);
    const overlayref=useRef(null);
    const [Boardstate, setboardstate] = useState(Pieces);   // contain the array which refer to the postion of the current pices
    const [gridx, setgridx] = useState(-1);
    const [gridy, setgridy] = useState(-1);
    const [activePiece, setactivepiece] = useState(null);
    const [roomname, setroomname] = useState("");
    const [color, setcolor] = useState();
    const [canmove, setcanmove] = useState(false);
    const [promotedpawn, setpromotedpawn] = useState(null);
    const referee = new Referee();                         //initilise the refree object


    const pawnpromomove = (e, image, type) => {
        promotionref.current.className = "promotionhidden";
        overlayref.current.remove('style');;
        const boardstate = Boardstate.map((p) => {
            if (p.x === promotedpawn.x && p.y === promotedpawn.y) {
                console.log("updated");
                const update = { ...p, image: image, type: type };
                return update;
            }
            else
                return p;
        });
        setboardstate(boardstate);
        setcanmove(false);
        socket.emit("move", boardstate);

    };
//##############################################################################
    // const grabPiece = (e) => {
    //     let minx = chessboardref.current.offsetLeft;
    //     let width = chessboardref.current.clientWidth;
    //     let miny = chessboardref.current.offsetTop;
    //     const element = e.target;
    //     if (element.classList.contains("chess_piece")) {

    //         setactivepiece(element);
    //         let ypos, xpos;
    //         if (color === 'w') {
    //             ypos = Math.floor((e.clientX - minx) / (width / 8));
    //             xpos = Math.floor((e.clientY - miny) / (width / 8));
    //         }
    //         else {

    //             ypos = Math.floor(((minx + width) - e.clientX) / (width / 8));
    //             xpos = Math.floor(((miny + width) - e.clientY) / (width / 8));
    //         }


    //         let x = e.clientX - minx - 30;
    //         let y = e.clientY - miny - 38;
    //         console.log(x, y);

    //         setgridx(xpos);
    //         setgridy(ypos);


    //         if (x < 0) {
    //             x = 0;
    //         }
    //         if (x > width - 30) {
    //             x = width - 30;
    //         }
    //         if (y < 0) {
    //             y = 0;
    //         }
    //         if (y > width - 30) {
    //             y = width - 30;
    //         }

    //         element.style.position = "absolute";
    //         element.style.left = `${x}px`;
    //         element.style.top = `${y}px`;


    //     }

    // }

//##############################################################################

    
    const grabPiece = (e) => {
        // New grabpiece function considering mobile option
        e.preventDefault(); // Prevent scrolling on touch devices
        const eventType = e.type.includes('mouse') ? 'mouse' : 'touch';
        
        let posX, posY;
        if (eventType === 'mouse') {
            posX = e.clientX;
            posY = e.clientY;
        } else {
            posX = e.touches[0].clientX;
            posY = e.touches[0].clientY;
        }
    
        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;
        const element = e.target;
        
        if (element.classList.contains("chess_piece")) {
            setactivepiece(element);
            let ypos, xpos;
            if (color === 'w') {
                ypos = Math.floor((posX - minx) / (width / 8));
                xpos = Math.floor((posY - miny) / (width / 8));
            } else {
                ypos = Math.floor(((minx + width) - posX) / (width / 8));
                xpos = Math.floor(((miny + width) - posY) / (width / 8));
            }
        
            let x,y;

            if (eventType === 'mouse') {
                 x = posX - minx - 30;
                 y = posY - miny - 38;
                // Boundaries for dragging within the chessboard
                x = Math.max(0, Math.min(x, width - 30));
                y = Math.max(0, Math.min(y, width - 38));
            }
            else
            {
                // mobile
                 x = posX - minx - 15;
                 y = posY - miny - 19;
                 // Boundaries for dragging within the chessboard
                 x = Math.max(0, Math.min(x, width - 15));
                 y = Math.max(0, Math.min(y, width - 19));
            }
            

            setgridx(xpos);
            setgridy(ypos);
    
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
    };


    // const movePiece = (e) => {

    //     let minx = chessboardref.current.offsetLeft;
    //     let width = chessboardref.current.clientWidth;
    //     let miny = chessboardref.current.offsetTop;


    //     if (activePiece !== null) {

    //         let x = e.clientX - minx - 30;
    //         let y = e.clientY - miny - 38;
    //         if (x < 0) {
    //             x = 0;
    //         }
    //         if (x > width - 30) {
    //             x = width - 30;
    //         }
    //         if (y < 0) {
    //             y = 0;
    //         }
    //         if (y > width - 38) {
    //             y = width - 38;
    //         }
    //         activePiece.style.position = "absolute";
    //         activePiece.style.left = `${x}px`;
    //         activePiece.style.top = `${y}px`;

    //     }

    // }

    const movePiece = (e) => {
        e.preventDefault(); // Prevent scrolling on touch devices
        const eventType = e.type.includes('mouse') ? 'mouse' : 'touch';
    
        let posX, posY;
        if (eventType === 'mouse') {
            posX = e.clientX;
            posY = e.clientY;
        } else {
            posX = e.touches[0].clientX;
            posY = e.touches[0].clientY;
        }
    
        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;
    
        if (activePiece !== null) {
            let x,y;
            if (eventType === 'mouse')
            {
                x = posX - minx - 30;
                y = posY - miny - 38;
                x = Math.max(0, Math.min(x, width - 30));
                y = Math.max(0, Math.min(y, width - 38));
            }
            else
            {
              // mobile
              x = posX - minx - 15;
              y = posY - miny - 19;
              // Boundaries for dragging within the chessboard
              x = Math.max(0, Math.min(x, width - 15));
              y = Math.max(0, Math.min(y, width - 19));  
            }
    
            activePiece.style.position = "absolute";
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    };
    
    

    // const leavePiece = (e) => {

    //     let minx = chessboardref.current.offsetLeft;
    //     let width = chessboardref.current.clientWidth;
    //     let miny = chessboardref.current.offsetTop;

    //     if (activePiece !== null) {

    //         // Inscreen horizontal is considered as x-axis but in my board i standard the  horizontal as y axis or (j)
    //         // let ypos = Math.floor((e.clientX - minx) / (width / 8));
    //         // let xpos = Math.floor((e.clientY - miny) / (width / 8));
    //         let ypos, xpos;
    //         if (color === 'w') {
    //             ypos = Math.floor((e.clientX - minx) / (width / 8));
    //             xpos = Math.floor((e.clientY - miny) / (width / 8));
    //         }
    //         else {

    //             ypos = Math.floor(((minx + width) - e.clientX) / (width / 8));
    //             xpos = Math.floor(((miny + width) - e.clientY) / (width / 8));
    //         }

    //         const currentpiece = Boardstate.find((p) => p.x === gridx && p.y === gridy);
    //         if (currentpiece) {
    //             const isvalid = referee.isValidmove(gridx, gridy, xpos, ypos, currentpiece.type, currentpiece.playertype, Boardstate);
    //             // 
    //             if (canmove&&isvalid && currentpiece.color === color) {

    //                 const endposition = (color === 'w') ? 0 : 7;

    //                 const boardstate = Boardstate.reduce((accumulator, p) => {
    //                     if (p.x === gridx && p.y === gridy) {
    //                         const updatedElement = { ...p, x: xpos, y: ypos };
    //                         accumulator.push(updatedElement);
    //                     }
    //                     else if (!(p.x === xpos && p.y === ypos)) {
    //                         // it will not push that piece which will be attacked by the valid move
    //                         accumulator.push(p);
    //                     }
    //                     return accumulator;
    //                 }, []);

    //                 setboardstate(boardstate);

    //                 if (currentpiece.type === 'pawn' && xpos === endposition) {
    //                     promotionref.current.className = "promotion";
    //                     promotionref.current.style.left = `${e.clientX - 30}px`;
    //                     promotionref.current.style.top = `${e.clientY - 30}px`;
    //                     overlayref.current.style.left= `${chessboardref.current.offsetLeft}px`;
    //                     overlayref.current.style.top= `${chessboardref.current.offsetTop}px`;
    //                     overlayref.current.style.height=`${chessboardref.current.clientWidth}px`;
    //                     overlayref.current.style.width=`${chessboardref.current.clientWidth}px`;
    //                     overlayref.current.style.zIndex=1;
    //                     const promotedpiece = { ...currentpiece, x: xpos, y: ypos };
    //                     setpromotedpawn(promotedpiece);

    //                 }
    //                 else {
    //                     //Normal move opposite player get the access and also see the updated board through server it get the msg

    //                     setcanmove(false);
    //                     socket.emit("move", boardstate);
    //                 }


    //             }
    //             else {
    //                 //Reset piece position if move is not valid
    //                 activePiece.style.removeProperty("top");
    //                 activePiece.style.removeProperty("left");
    //             }

    //         }
    //         else {
    //             activePiece.style.removeProperty("top");
    //             activePiece.style.removeProperty("left");

    //         }

    //         setactivepiece(null);


    //     }
    // }

    //##############################################################################################################

    const leavePiece = (e) => {
        e.preventDefault(); // Prevent scrolling on touch devices
        const eventType = e.type.includes('mouse') ? 'mouse' : 'touch';
    
        let posX, posY;
        if (eventType === 'mouse') {
            posX = e.clientX;
            posY = e.clientY;
        } else {
            posX = e.changedTouches[0].clientX;  // Use `changedTouches` for touchend
            posY = e.changedTouches[0].clientY;
        }
    
        let minx = chessboardref.current.offsetLeft;
        let width = chessboardref.current.clientWidth;
        let miny = chessboardref.current.offsetTop;
    
        if (activePiece !== null) {
            let ypos, xpos;
            if (color === 'w') {
                ypos = Math.floor((posX - minx) / (width / 8));
                xpos = Math.floor((posY - miny) / (width / 8));
            } else {
                ypos = Math.floor(((minx + width) - posX) / (width / 8));
                xpos = Math.floor(((miny + width) - posY) / (width / 8));
            }
    
            const currentpiece = Boardstate.find((p) => p.x === gridx && p.y === gridy);
            if (currentpiece) {
                const isvalid = referee.isValidmove(gridx, gridy, xpos, ypos, currentpiece.type, currentpiece.playertype, Boardstate);
                if (canmove && isvalid && currentpiece.color === color) {
                    const endposition = (color === 'w') ? 0 : 7;
    
                    const boardstate = Boardstate.reduce((accumulator, p) => {
                        if (p.x === gridx && p.y === gridy) {
                            const updatedElement = { ...p, x: xpos, y: ypos };
                            accumulator.push(updatedElement);
                        } else if (!(p.x === xpos && p.y === ypos)) {
                            accumulator.push(p);
                        }
                        return accumulator;
                    }, []);
    
                    setboardstate(boardstate);
    
                    if (currentpiece.type === 'pawn' && xpos === endposition) {
                        promotionref.current.className = "promotion";
                        promotionref.current.style.left = `${posX - 30}px`;
                        promotionref.current.style.top = `${posY - 30}px`;
                        overlayref.current.style.left = `${chessboardref.current.offsetLeft}px`;
                        overlayref.current.style.top = `${chessboardref.current.offsetTop}px`;
                        overlayref.current.style.height = `${chessboardref.current.clientWidth}px`;
                        overlayref.current.style.width = `${chessboardref.current.clientWidth}px`;
                        overlayref.current.style.zIndex = 1;
                        const promotedpiece = { ...currentpiece, x: xpos, y: ypos };
                        setpromotedpawn(promotedpiece);
                    } else {
                        setcanmove(false);
                        socket.emit("move", boardstate);
                    }
                } else {
                    activePiece.style.removeProperty("top");
                    activePiece.style.removeProperty("left");
                }
            } else {
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");
            }
    
            setactivepiece(null);
        }
    };
    
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
    const promopice = Promotionpieces(color);//contain the piece which showed in time of promotion


    //##############################################################################################################

    if (color === 'w') {
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

    else {

        for (let i = 7; i >= 0; i--) {
            for (let j = 7; j >= 0; j--) {
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
           
            <div className='overlay' style={{ position: "absolute"}} ref={overlayref}>
                 {/*this creates overlay and you can not move any other piece because z-index is more */}
            </div>
            <div className='promotionhidden' ref={promotionref} >
                    {
                        // remember here hight and width are fix 
                        promopice.map(p => {
                            return <img key={p.type} src={p.image} style={{ height: '60px', width: '60px' }} onClick={(e) => { pawnpromomove(e, p.image, p.type) }} />;
                        })
                    }
            </div>


            <div ref={chessboardref} className='chessboard'
                onMouseDown={grabPiece}
                onMouseMove={movePiece}
                onMouseUp={leavePiece}
                onMouseLeave={leavePiece}

                // mobile
                onTouchStart={grabPiece}  // Handles touch events
                onTouchMove={movePiece}   // Handles touch move events
                onTouchEnd={leavePiece}   // Handles touch end events
                onTouchCancel={leavePiece}
            >{board}</div>
        </div>

    )
}

export default Chessboard
