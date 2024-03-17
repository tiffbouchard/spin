import React from 'react';
import {
  isMobile
} from "react-device-detect";
import {SettingsContext} from '../../context/settingsContext';


import './MusicPlayer.scss';

const MusicPlayer = (props) => {
  const { nowPlaying } = props;
  const { hoverToPlay } = React.useContext(SettingsContext);


  return (
    <div className="container">
    {isMobile || !hoverToPlay ? 
      nowPlaying &&
          <div className="player">
            <div className="music-info">
              <div>
                <img src={nowPlaying[0]} alt="Currently Playing Album Cover"/>
              </div>
            </div>
            <div className="trackinfo">
              <div>
                <p>{nowPlaying[1]}</p>
                <small className="secondary-text">{nowPlaying[2]}</small>
              </div>
            </div>
            {/* <div className="controls">
              <FontAwesomeIcon icon={faFastBackward} />
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faFastForward} />
            </div>
            <div className="like">
              <FontAwesomeIcon icon={faHeart} />
            </div> */}

          </div>
        :

        nowPlaying &&
          <div className="player">
            <div className="music-info">
              <div>
                <img src={nowPlaying[0]} alt="Currently Playing Album Cover"/>
              </div>
            </div>
            <div className="trackinfo">
              <div>
                <p>{nowPlaying[1]}</p>
                <small className="secondary-text">{nowPlaying[2]}</small>
              </div>
            </div>
            {/* <div className="controls">
              <FontAwesomeIcon icon={faFastBackward} />
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faFastForward} />
            </div>
            <div className="like">
              <FontAwesomeIcon icon={faHeart} />
            </div> */}
          </div>
      }
    </div>
    );
}

export default MusicPlayer;