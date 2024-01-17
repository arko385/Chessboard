export default class Referee {
    isonboard(x, y) {
        if ((x >= 0 && x < 8) && (y >= 0 && y < 8))
            return true;
        else
            return false;
    }
    tileOccupied(x, y, Boardstate) {
        const occupy = Boardstate.find((p) => p.x === x && p.y === y);
        if (occupy)
            return true;
        else
            return false;
    }
    tileOccupiedbyEneimy(x, y, Boardstate, playertype) {
        const occupy = Boardstate.find((p) => p.x === x && p.y === y && p.playertype !== playertype);
        if (occupy)
            return true;
        else
            return false;
    }

    tileOccupiedbyOwn(x, y, Boardstate, playertype) {
        const occupy = Boardstate.find((p) => p.x === x && p.y === y && p.playertype === playertype);
        if (occupy)
            return true;
        else
            return false;
    }

    tileOccupieddiagonally(Boardstate, diagonalsign, prevx, prevy, currx, curry) {
        let constant = Math.abs(prevx + (diagonalsign * prevy));
        const smallx = (prevx < currx) ? prevx : currx;
        const bigx = (prevx < currx) ? currx : prevx;
        const smally = (prevy < curry) ? prevy : curry;
        const bigy = (prevy < curry) ? curry : prevy;
        const occupy = Boardstate.find((p) => (Math.abs(p.x + (diagonalsign * p.y)) === constant && (smallx < p.x && p.x < bigx) && (smally < p.y && p.y < bigy)));

        if (occupy)
            return true;
        else
            return false;


    }

    tileOccupiedlinearly(Boardstate, prevx, prevy, currx, curry) {
        const smallx = (prevx < currx) ? prevx : currx;
        const bigx = (prevx < currx) ? currx : prevx;
        const smally = (prevy < curry) ? prevy : curry;
        const bigy = (prevy < curry) ? curry : prevy;

        if (prevx === currx) //linear movement
        {
            const occupy = Boardstate.find((p) => p.x === currx && (smally < p.y && p.y < bigy));

            if (occupy)
                return true;
            else
                return false;
        }
        else if (prevy === curry)//verticle movement
        {
            const occupy = Boardstate.find((p) => p.y === curry && (smallx < p.x && p.x < bigx));

            if (occupy)
                return true;
            else
                return false;
        }

        return true;


    }

    isValidmove(prevx, prevy, currx, curry, type, playertype, Boardstate) {

        //###########################################################################################################
        if (type === "pawn") {
            const specialposition = (playertype === 'own') ? 6 : 1;

            const movementsign = (playertype === 'own') ? 1 : -1;
            // if black piece below board
            //const movementsign = 1 ;
            //Movement logic
            // Normal one tile movement
            if (curry === prevy && prevx - currx === movementsign) {
                if (!this.tileOccupied(currx, curry, Boardstate))
                    console.log("valid");
                return true;
            }

            //speical case for 2 tile movement
            else if (prevx === specialposition && curry === prevy) {
                if (prevx - currx === (2 * movementsign) && ((!this.tileOccupied(currx + movementsign, curry, Boardstate)) && (!this.tileOccupied(currx, curry, Boardstate)))) {
                    return true;
                }

            }
            //Attacking logic
            else if (prevx - currx === movementsign && (Math.abs(prevy - curry) === 1) && this.tileOccupiedbyEneimy(currx, curry, Boardstate, playertype)) {
                return true;
            }

        }

        //###########################################################################################################
        else if (type === "knight") {


            if (this.isonboard(currx, curry) && (((Math.abs(prevx - currx) === 1) && Math.abs(prevy - curry) === 2) || (Math.abs(prevx - currx) === 2 && Math.abs(prevy - curry) === 1))) {
                if (!this.tileOccupiedbyOwn(currx, curry, Boardstate, playertype)) {
                    return true;
                }

            }
        }

        //###########################################################################################################
        else if (type === "bishop") {
            let diagonalsign = 0;
            if (currx + curry === prevx + prevy) {
                diagonalsign = 1; //bottom-left <--> top-right
            }
            else if ((currx - curry) === (prevx - prevy)) {
                diagonalsign = -1; //top-left <-->bottom-right
            }
            if (this.isonboard(currx, curry) && diagonalsign !== 0 && !this.tileOccupieddiagonally(Boardstate, diagonalsign, prevx, prevy, currx, curry) && !this.tileOccupiedbyOwn(currx, curry, Boardstate, playertype)) {
                return true;
            }

        }

        //###########################################################################################################
        else if (type === "rook") {
            if (prevx === currx || prevy === curry) {
                if (this.isonboard(currx, curry) && !this.tileOccupiedlinearly(Boardstate, prevx, prevy, currx, curry) && !this.tileOccupiedbyOwn(currx, curry, Boardstate, playertype))
                    return true;
            }

        }

        //###########################################################################################################
        else if (type === "queen") // it's property is the combination of rook and bishop
        {
            if (prevx === currx || prevy === curry) {
                if (this.isonboard(currx, curry) && !this.tileOccupiedlinearly(Boardstate, prevx, prevy, currx, curry) && !this.tileOccupiedbyOwn(currx, curry, Boardstate, playertype)) {
                    console.log("by rooks move")
                    return true;
                }
            }
            let diagonalsign = 0;
            if (currx + curry === prevx + prevy) {
                diagonalsign = 1; //bottom-left <--> top-right
            }
            else if ((currx - curry) === (prevx - prevy)) {
                console.log(currx, curry);
                console.log(prevx, prevy);
                console.log(Math.abs(currx - curry));
                console.log(Math.abs(prevx - prevy));
                diagonalsign = -1; //top-left <-->bottom-right
            }
            if (this.isonboard(currx, curry) && diagonalsign !== 0 && !this.tileOccupieddiagonally(Boardstate, diagonalsign, prevx, prevy, currx, curry) && !this.tileOccupiedbyOwn(currx, curry, Boardstate, playertype)) {
                console.log("by bishop move", diagonalsign);
                return true;
            }
        }

        //###########################################################################################################
        else if(type==="king")
        {
            if(Math.abs(currx-prevx)<=1&&Math.abs(curry-prevy)<=1)
            {
                if(this.isonboard(currx, curry)&&!this.tileOccupiedbyOwn(currx, curry, Boardstate, playertype))
                {

                    console.log("one move");
                    return true;
                }
            }
        }



        return false;
    }
}