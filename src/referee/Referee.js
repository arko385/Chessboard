export default class Referee {

    tileOccupied(x, y, Boardstate) {
        const occupy = Boardstate.find((p) => p.x === x && p.y === y);
        if (occupy)
            return true;
        else
            return false;
    }

    isValidmove(prevx, prevy, currx, curry, type, playertype, Boardstate) {

        //###########################################################################################################
        if (type === "pawn") {
            const specialposition = (playertype === 'own') ? 6 : 1;
            const movementsign = (playertype === 'own') ? 1 : -1;
            // Normal one tile movement
            if (curry === prevy && prevx - currx === movementsign) {
                if (!this.tileOccupied(currx, curry, Boardstate))
                    return true;
            }

            //speical case for 2 tile movement
            else if (prevx === specialposition && curry === prevy) {
                if (prevx - currx === (2 * movementsign) && ((!this.tileOccupied(currx + movementsign, curry, Boardstate)) && (!this.tileOccupied(currx, curry, Boardstate)))) {
                    return true;
                }

            }

        }

        // #region
        // if (type === "pawn") {
        //     // White pawns move
        //     if (playertype === 'own') {
        //         // special case where white piece can move atleast two tiles
        //         if (prevx === 6 && curry === prevy) {
        //             //i) Move one tile ->if that tile is empty then it can move
        //             if (prevx - currx === 1 && !this.tileOccupied(currx, curry, Boardstate)) {
        //                 return true;
        //             }
        //             //ii) Move two tile-> if that tile or the previous tile (which has to cross to reach that tile) is empty then it can move
        //             else if (prevx - currx === 2 && ((!this.tileOccupied(currx + 1, curry, Boardstate)) && (!this.tileOccupied(currx, curry, Boardstate)))) {
        //                 return true;
        //             }

        //         }
        //         //Normal move where it can cover atmost one tile and if the tile is empty then it can move
        //         else if (curry === prevy && prevx - currx === 1) {
        //             if (!this.tileOccupied(currx, curry, Boardstate))
        //                 return true;
        //         }
        //     }

        //     //Black pawns move
        //     else {
        //         // special case where black piece can move atleast two tiles
        //         if (prevx === 1 && curry === prevy) {

        //             //i) Move one tile ->if that tile is empty then it can move
        //             if (currx - prevx === 1 && !this.tileOccupied(currx, curry, Boardstate)) {
        //                 return true;
        //             }
        //             //ii) Move two tile-> if that tile or the previous tile (which has to cross to reach that tile) is empty then it can move
        //             else if (currx - prevx === 2 && ((!this.tileOccupied(currx - 1, curry, Boardstate)) && (!this.tileOccupied(currx, curry, Boardstate)))) {
        //                 return true;
        //             }
        //         }
        //         //Normal move where it can cover atmost one tile and if the tile is empty then it can move
        //         else if (curry === prevy && currx - prevx === 1) {
        //             if (!this.tileOccupied(currx, curry, Boardstate))
        //                 return true;
        //         }
        //     }

        // }
        //#endregion


        //###########################################################################################################









        return false;
    }
}