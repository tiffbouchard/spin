import React from 'react';
import {
  isMobile
} from "react-device-detect";

import Loader from "../Loader/Loader";
import './InfoCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faStop, faPlay, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import logo from "../../images/Spotify_Icon_RGB_Green.png";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { SettingsContext } from "../../context/settingsContext";


const InfoCard = (props) => {
  const {handleClick, artistDetails, following, handleFollow, setClickedNewArtist, clickedNewArtist} = props;
  const [play, setPlay] = React.useState(false);  
  const [nowPlaying, setNowPlaying] = React.useState(null);
  const [playing, setPlaying] = React.useState(true);
  const audioEl = React.useRef(null);
  const { hoverToPlay } = React.useContext(SettingsContext);



  const playMusic = (event) => {
    event.stopPropagation();
    setPlaying(true);
    setPlay(event.target.id);
    setNowPlaying([event.target.src, event.target.getAttribute("data-name"), event.target.getAttribute("data-artists")]);
    clickedNewArtist && setClickedNewArtist(false);
  }

  const togglePlayMusic = (event) => {
    clickedNewArtist && setClickedNewArtist(false);
    if ( nowPlaying && event.target.id === nowPlaying[3]) {
      setNowPlaying([event.target.getAttribute("data-img"), event.target.getAttribute("data-name"), event.target.getAttribute("data-artists"), event.target.id]);
      setPlay(!play);
      setPlaying(!playing);
    } else if ( (nowPlaying === null || nowPlaying[0] === null) && play === false ) {
      setNowPlaying([event.target.getAttribute("data-img"), event.target.getAttribute("data-name"), event.target.getAttribute("data-artists"), event.target.id]);
      setPlay(true);
      setPlaying(true);

    } else if ( (nowPlaying === null || nowPlaying[0] === null) && play === true ) {
      setNowPlaying([event.target.getAttribute("data-img"), event.target.getAttribute("data-name"), event.target.getAttribute("data-artists"), event.target.id]);
      setPlay(true);
      setPlaying(true);

    } else if ( play && nowPlaying && event.target.id !== nowPlaying[3]) {
      setNowPlaying([event.target.getAttribute("data-img"), event.target.getAttribute("data-name"), event.target.getAttribute("data-artists"), event.target.id]);
      setPlay(true);
      setPlaying(true);

    } else if ( play === false && nowPlaying && event.target.id !== nowPlaying[3]) {
      setNowPlaying([event.target.getAttribute("data-img"), event.target.getAttribute("data-name"), event.target.getAttribute("data-artists"), event.target.id]);
      setPlay(true);
      setPlaying(true);

    } else {
      setNowPlaying([event.target.getAttribute("data-img"), event.target.getAttribute("data-name"), event.target.getAttribute("data-artists"), event.target.id]);
      setPlay(true);
      setPlaying(true);

    }
  }

  const hideMusicPlayer = () => {
    setPlaying(false);
    setPlay(false);

  }

  const stopMusic = (event) => {
    event.stopPropagation();
    setPlaying(false);
    setPlay(null);
    setNowPlaying(null);
  }

  if (!artistDetails) {
    return (
      <Loader/>
    ) 
  }

  return (
    <div className="info-card">
      <div className="current-artist">
        <div className="thumbnail">
          <img src={artistDetails.artist.images.length ? artistDetails.artist.images[0].url : logo} alt={`${artistDetails.artist.name}`}/>
        </div>
        <div className="about">
          <h2>{artistDetails.artist.name} 
            <a target="_blank" rel="noreferrer" className="external-tag" href={artistDetails.artist.external_urls.spotify}>          
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </h2>
          
          <small className="stats">{artistDetails.artist.followers.total} followers</small>
          <div className="tags">{artistDetails.artist.genres.map((genre) =>  <small key={genre}>{genre}</small>)}</div>

          {artistDetails.doesFollow || following === 204 ? 
                <button id={artistDetails.artist.id} className="follow-btn">Following</button> 
                : 
                
                  <button onClick={handleFollow} id={artistDetails.artist.id} className="follow-btn">Follow&nbsp;<FontAwesomeIcon icon={faPlusCircle}/></button>
              
              }
        </div>
      </div>
      <div className="related-tracks">
          <h2>Top Tracks</h2>
          <div className="related m-0">
            
            {artistDetails.topTracks && artistDetails.topTracks.tracks && artistDetails.topTracks.tracks.map((track) => 
              <div key={track.id}>

                { isMobile || !hoverToPlay ? 

                  track.is_playable && play && nowPlaying && nowPlaying[3] === track.id &&
                  <audio id={track.id} autoPlay ref={audioEl} onLoadedData={() => audioEl.current.play()}  onEnded={() => hideMusicPlayer()}>
                    <source src={track.preview_url} type=""/>
                  </audio>
                
                : 
                
                
                  track.is_playable && nowPlaying && play === track.id &&
                    <audio id={track.id} autoPlay ref={audioEl} onLoadedData={() => audioEl.current.play()}  onEnded={() => hideMusicPlayer()}>
                      <source src={track.preview_url} type=""/>
                    </audio>
                  
                }

                { isMobile || !hoverToPlay ? 
                
                track.is_playable && 
                  
                <div className="album-thumbnail">
                  <button className="play-overlay-trigger" data-img={track.album.images[0].url} data-name={track.name} data-artists={track.artists.map((artist) => artist.name)} onClick={togglePlayMusic} id={track.id}></button>
                  <div className="play-overlay" ><FontAwesomeIcon icon={ play && nowPlaying && nowPlaying[3] === track.id ? faStop : faPlay } /></div>
                  <img src={track.album.images[0].url} alt={`${track.album.name} Album Cover`}/>
                </div>
                
                :
                
                  track.is_playable && 
                  <div className="album-thumbnail">
                    <img src={track.album.images[0].url} data-name={track.name} data-artists={track.artists.map((artist) => artist.name)} onMouseEnter={playMusic} onMouseLeave={stopMusic} id={track.id} alt={`${track.name} Album Cover`}/>
                  </div>
                
                
                }
                
              </div>
            )}


          </div>

      <h2>Related Artists</h2>
      <div className="related">

        {artistDetails.related && artistDetails.related.artists && artistDetails.related.artists.map((artist) => 
          <div className="artist" key={artist.id} onClick={handleClick}>
            <div className="thumbnail">
              <img src={artist.images.length ? artist.images[0].url : logo} id={artist.id} alt={`${artist.name}`}/>
            </div>
            <small>{artist.name}</small>
          </div>
        )}
      </div>
        </div>
        {playing && !clickedNewArtist && <MusicPlayer nowPlaying={nowPlaying} playing={playing}/>}
    </div>
    );
}

 
export default InfoCard;