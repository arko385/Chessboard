import React from 'react'


function Tile({number,image}) {
    if(number%2===0)
    {
        return (
          <div className='light'>
           
             {image!==null&&<div style={{ backgroundImage: `url(${image})`}} className='chess_piece'> </div>} 

          </div>
        )

    }
    else
    {
        return (
          <div className='dark'>
             {image!==null&&<div style={{ backgroundImage: `url(${image})`}} className='chess_piece'> </div>} 
          </div>
        )

    }

    
}

export default Tile
