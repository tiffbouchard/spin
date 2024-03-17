import React from 'react';
import { Link, useLocation } from "react-router-dom";

import logo from "../../images/Spotify_Icon_RGB_Green.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faDice, faUserPlus, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { faBehanceSquare, faInstagramSquare, faGithubSquare, faLinkedin} from '@fortawesome/free-brands-svg-icons';

import './Sidebar.scss';

const Sidebar = () => {  
  let location = useLocation();

  const [selected, setSelected] = React.useState();

  const toggleClass = (category) => {
    setSelected(category)
  }

  const handleClick = (event) => {
    toggleClass(event.target.id)
  }

  const getPath = () => {
    setSelected(location.pathname.replace("/", ""));
  }

  React.useEffect(() => {
    getPath();
  }, [])


  return (
    <aside>
      <div className="user-info">
        <div className="thumbnail spotify">
          <Link to="/">
            <img src={logo} alt="Spotify Logo"/>
          </Link>
        </div>
        <h2>Artist Explorer</h2>
      </div> 
      <ul className="side-nav">
        <Link className="link" to="/top">
          <li className={selected === "top" ? 'active' : null}  onClick={handleClick} id="top">
            <FontAwesomeIcon icon={faTrophy} />&nbsp;
            Top Artists
          </li>
        </Link>
        <Link className="link" to="/random">
          <li className={selected === "random" ? 'active' : null}  onClick={handleClick} id="random">
            <FontAwesomeIcon icon={faDice} />&nbsp;
            Random
          </li>
        </Link>
        <Link className="link" to="/following">
          <li className={selected === "following" ? 'active' : null}  onClick={handleClick} id="following">
            <FontAwesomeIcon icon={faUserPlus} />&nbsp;
            Following
          </li>
        </Link>
      </ul>
      <div className="social-icons">
        <a href="https://github.com/tiffbouchard" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithubSquare} />&nbsp;
        </a>
        <a href="https://linkedin.com/in/tiffanybouchard" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />&nbsp;
        </a>
        <a href="https://behance.net/tiffanybouchard" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faBehanceSquare} />&nbsp;
        </a>
        <a href="https://tiffbouchard.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faExternalLinkSquareAlt} />&nbsp;
        </a>
        <a href="https://instagram.com/tiffbouchard" targe="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagramSquare} />&nbsp;
        </a>
      </div>
    </aside>
    );
}

export default Sidebar;

