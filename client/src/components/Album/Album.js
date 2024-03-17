import React, { useState } from 'react';
import './Album.css'; // Assuming you have some CSS for styling

const Album = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    console.log(props.length)
  };

  return (
    <div                             
        style={{ 
            '--translate-amount': `calc(${props.index * 30}px)`,  
            '--expanded-translate-amount': `calc(${props.index * 60}px)`,
            // '--scale-factor': `calc(${props.index === props.length - 1 ? 1 : 1 - (props.length - props.index - 1) * 0.05})`
        }}    
        className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.image}/>
        </div>
        <div className="flip-card-back">
         <img src={props.image}/>
        </div>
      </div>
    </div>
  );
};

export default Album;
