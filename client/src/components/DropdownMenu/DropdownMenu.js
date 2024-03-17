import React from 'react';
import {
  isMobile
} from "react-device-detect";

import { UserContext } from '../../context/userContext';
import { SettingsContext } from '../../context/settingsContext';
import { logout } from '../../utils/spotifyService';


import "./DropdownMenu.scss";

const Dropdown = (props) => {
  const { user } = React.useContext(UserContext);
  const { hoverToPlay } = React.useContext(SettingsContext);

  const handleSelect = () => {
    props.setHoverToPlaySetting(!hoverToPlay)
  }
  
  return (
    <div className={props.show ? "dropdown activemenu" : "dropdown"}>
      <small>{user.display_name}</small>
      <small>{user.email}</small>
      <div className="form-row">
        {isMobile ?
        
        <input disabled={true} checked={true} type="checkbox" name="pref-one" onClick={handleSelect}/>
        :
        <input type="checkbox" name="pref-one" onClick={handleSelect}/>

        }
        <small><label htmlFor="pref-one">Disable hover to play</label></small>
      </div>
      <button onClick={logout}>
        Logout
      </button>
    </div>
    );
}
 
export default Dropdown;