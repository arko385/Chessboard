import io from 'socket.io-client';
import { nanoid } from "nanoid";
const url = "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/";
//export const socket = io.connect("http://localhost:4000");
export const socket = io.connect("https://chesssocket.onrender.com");
export const userid=nanoid(4);
export const Pieces = [];
let type, xpos ,playertype;


for (let j = 0; j < 2; j++) {
    if (j === 0) {
        // for black piece and the first row
        type = "b";
        xpos = 0;
        playertype="opponent";
    }
    if (j === 1) {
        // for white piece and the last row
        type = "w";
        xpos = 7;
        playertype="own"
    }

    for (let i = 0; i < 8; i++) {

        if (i === 0 || i === 7)
            Pieces.push({ x: xpos, y: i, image: url + type + "r.png",type:"rook",playertype: playertype,color:type});
        if (i === 1 || i === 6)
            Pieces.push({ x: xpos, y: i, image: url + type + "n.png",type:"knight",playertype: playertype,color:type });
        if (i === 2 || i ===5)
            Pieces.push({ x: xpos, y: i, image: url + type + "b.png",type:"bishop",playertype: playertype,color:type });
        if (i === 3)
            Pieces.push({ x: xpos, y: i, image: url + type + "q.png",type:"queen",playertype: playertype,color:type });
        if (i === 4)
            Pieces.push({ x: xpos, y: i, image: url + type + "k.png",type:"king",playertype: playertype,color:type});
    }
}

// Pawns arrangement
for (let i = 0; i < 8; i++) {
    Pieces.push({ x: 6, y: i, image: url + "wp.png",type:"pawn",playertype: "own",color:'w' }); //white pawns
    Pieces.push({ x: 1, y: i, image: url + "bp.png",type:"pawn",playertype: "opponent",color:'b'}); //black pawns
}
