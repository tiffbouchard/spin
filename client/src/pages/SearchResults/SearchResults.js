import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getAllArtistInfo, followArtist} from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card";
import { UserContext } from '../../context/userContext';

const SearchResults = (props) => {
  const { user } = React.useContext(UserContext);
  const { loading, results, searchQuery } = props;
  const [artistDetails, setArtistDetails] = React.useState(null);  
  const [following, setFollowing] = React.useState();  

  const handleFollow = async (event) => {
    const following = await followArtist(event.target.id);
    console.log(following.status)
    setFollowing(following.status)
  }
  
  const getArtistDetails = async (artistId) => {
    const artistDetails = await getAllArtistInfo(artistId, user.country);
    setArtistDetails(artistDetails);

  }
  
  const handleClick = (event) => {
    event.stopPropagation();
    getArtistDetails(event.target.id);
    setFollowing(null);
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  
  if (loading) {
    return (
      <Loader />
      )
    }
    
    else if (results && results.length === 0) {
      return (
        <main className="content">
          <h1>No results for {searchQuery}</h1>
        </main>
      )
    }

    return ( 
    <main className="content">
      <h1>Search Results for {searchQuery}</h1>
      {artistDetails && 
        <InfoCard 
        handleFollow={handleFollow}
        following={following}
          artistDetails={artistDetails}
          handleClick={handleClick} 
        />}
      <div className="card-container">
      {results && results.map((a) => 
          <Card 
            id={a.id}
            handleClick={handleClick} 
            image={a.images[0] ? a.images[0].url : null} 
            name={a.name}
          />
        )}
        
      </div>
    </main> 
    );
}
 
export default SearchResults;