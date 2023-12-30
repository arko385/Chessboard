
const url = "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/";
export const Pieces = [];
let type = "", xpos = 1,playertype;


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
            Pieces.push({ x: xpos, y: i, image: url + type + "r.png",type:"rook",playertype: playertype});
        if (i === 1 || i === 6)
            Pieces.push({ x: xpos, y: i, image: url + type + "n.png",type:"knight",playertype: playertype });
        if (i === 2 || i ===5)
            Pieces.push({ x: xpos, y: i, image: url + type + "b.png",type:"bishop",playertype: playertype });
        if (i === 3)
            Pieces.push({ x: xpos, y: i, image: url + type + "q.png",type:"queen",playertype: playertype });
        if (i === 4)
            Pieces.push({ x: xpos, y: i, image: url + type + "k.png",type:"king",playertype: playertype});
    }
}

// Pawns arrangement
for (let i = 0; i < 8; i++) {
    Pieces.push({ x: 6, y: i, image: url + "wp.png",type:"pawn",playertype: "own" }); //white pawns
    Pieces.push({ x: 1, y: i, image: url + "bp.png",type:"pawn",playertype: "opponent" }); //black pawns
}
