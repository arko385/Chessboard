export default class Referee {

    tileOccupied(x, y, Boardstate) {
        const occupy = Boardstate.find((p) => p.x === x && p.y === y);
        if (occupy)
            return true;
        else
            return false;
    }
    tileOccupiedbyEneimy(x, y, Boardstate,playertype)
    {
        const occupy=Boardstate.find((p) => p.x === x && p.y === y&&p.playertype!==playertype);
        if (occupy)
        return true;
        else
        return false;
    }

    tileOccupiedbyOwn(x, y, Boardstate,playertype)
    {
        const occupy=Boardstate.find((p) => p.x === x && p.y === y&&p.playertype===playertype);
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
        //Movement logic
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
        //Attacking logic
            else if(prevx-currx=== movementsign&&(Math.abs(prevy-curry)===1)&&this.tileOccupiedbyEneimy(currx,curry,Boardstate,playertype))
            {
               return true;
            }

        }

        //###########################################################################################################
       else if(type==="knight")
       {
           if((Math.abs(prevx-currx)===1&&Math.abs(prevy-curry)===2)||(Math.abs(prevx-currx)===2&&Math.abs(prevy-curry)===1))
           {
              if(!this.tileOccupiedbyOwn(currx,curry,Boardstate,playertype))
              return true;
           }
       }
       








        return false;
    }
}