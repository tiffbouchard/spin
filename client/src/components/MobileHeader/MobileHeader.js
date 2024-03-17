import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../images/Spotify_Icon_RGB_Green.png";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { UserContext } from '../../context/userContext';


import './MobileHeader.scss';

const MobileHeader = () => {
  const { user } = React.useContext(UserContext);
  const [show, setShow] = React.useState(false);


  const toggleMenu = (event) => {
    event.stopPropagation();
    setShow(!show)
  }

  return (
    <div className="mobile-header">
      <div className="logo-cont">
        <Link to="/">
          <img src={logo} alt="Spotify Logo"/>
          <h2>Artist Explorer</h2>
        </Link>
      </div>
      <div className="mobile-thumbnail-small dropdowntrigger">
        <img src={user.images && user.images[0].url} onClick={toggleMenu} alt="Current User"/>
        <DropdownMenu show={show}/>
      </div>
    </div> 
    );
}

export default MobileHeader;

