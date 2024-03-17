import React from 'react';

import Loader from "../../components/Loader/Loader";
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong, getAllArtistInfo, followArtist} from "../../utils/spotifyService";
import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card";

import "./TopArtists.scss";
import { UserContext } from '../../context/userContext';

const TopArtists = () => {
  const { user } = React.useContext(UserContext);
  const [artists, setArtists] = React.useState(null);   
  const [artistDetails, setArtistDetails] = React.useState(null);  
  const [following, setFollowing] = React.useState();  

  
  const getArtists = async () => {
    const artists = await getTopArtistsLong();
    setArtists(artists.data);
  }
  

  const getSixMonths = async () => {
    const artists = await getTopArtistsMedium();
    setArtists(artists.data);
  }
  

  const handleFollow = async (event) => {
    const following = await followArtist(event.target.id);
    setFollowing(following.status);
  }

  const getFourWeeks = async () => {
    const artists = await getTopArtistsShort();
    setArtists(artists.data);
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

  React.useEffect(() => {
    getArtists();
  }, [])

  
  if (!artists) {
    return (
      <Loader />
    )
  }

  return ( 
    <main className="content">
      <div className="header">
        <h1>Top Artists</h1>
        <div>
          <button onClick={getArtists}>All Time</button>
          <button onClick={getSixMonths}>Last 6 Months</button>
          <button onClick={getFourWeeks}>Last 4 Weeks</button>
        </div>
      </div>
      {artistDetails && 
        <InfoCard
          handleFollow={handleFollow}
          following={following}
          artistDetails={artistDetails}
          handleClick={handleClick} 
        />}
      <div className="card-container">
      {artists && artists.items.map((a) => 
          <Card 
            key={a.id}
            id={a.id}
            handleClick={handleClick} 
            image={a.images[0].url} 
            name={a.name}
          />
        )}
        
      </div>
    </main> 
    );
}
 
export default TopArtists;