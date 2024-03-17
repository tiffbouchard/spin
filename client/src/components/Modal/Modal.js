import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faDice, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

import "./Modal.scss";

const Modal = (props) => {
  const { title, body, closeModal, type} = props;

  return (
    <div className="modal-back">
      <div className="modal">
        <h2>{title}</h2>
        {type === "welcome" ? 
          <div className="welcome-msg">
            <p>Artist Explorer is the perfect way to discover new artists that match your vibe. Start with what's familiar and find your way to someone new.</p>
            <p><b>You can start exploring artists four ways...</b></p>
            <div className="icons">
              <div>
                <h1><FontAwesomeIcon icon={faTrophy}/></h1>
                <p>Start with your top artists of all time, last 6 months or 4 weeks.</p>
              </div>
              <div>
                <h1><FontAwesomeIcon icon={faDice}/></h1>
                <p>Generate a random artist based on who you've been listening to lately.</p>
              </div>
              <div>
                <h1><FontAwesomeIcon icon={faUserPlus}/></h1>
                <p>Start with the artists you already follow.</p>
              </div>
              <div>
                <h1><FontAwesomeIcon icon={faSearch}/></h1>
                <p>Have someone you're thinking of? Search it up!</p>
              </div>
            </div>
            <p>
              Found your starting point? Click on your favourite artist to find similar artists and listen to their top tracks.  Continue clicking on artists until you find what you're looking for! <b>Tracks play on hover to make music discovery super fast. If this is annoying to you, go ahead and click your profile image in the top right and <i>"Disable hover to play".</i></b>
            </p>

          </div>
          :
          <p>
            {body}
          </p>
        }
        <div className="call-to-action">
          <button onClick={closeModal}>Let's go!</button>
        </div>
      </div>

    </div>
    );
}
 
export default Modal;