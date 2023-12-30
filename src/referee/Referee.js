export default class Referee{
    isValidmove(prevx,prevy,currx,curry,type,playertype)
    {
        
        if(type==="pawn")
        {
            if(playertype==='own')
            {
                if(prevx===6&&curry===prevy&&(prevx-currx===1||prevx-currx===2))
                {
                  
                    return true;
                }
                else if(curry===prevy&&prevx-currx===1)
                {
                    
                    return true;
                }
            }
            else
            {
                if(prevx===1&&curry===prevy&&(currx-prevx===1||currx-prevx===2))
                {
                    return true;
                }
                else if(curry===prevy&&currx-prevx===1)
                {
                    return true;
                }
            }
           
        }
        return false;
    }
}