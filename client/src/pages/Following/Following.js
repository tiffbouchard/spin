import React from 'react';
import Loader from "../../components/Loader/Loader";
import { getFollowing, getAllArtistInfo, getUser, followArtist } from "../../utils/spotifyService";

import InfoCard from "../../components/InfoCard/InfoCard";
import Card from "../../components/Card/Card"


const Following = () => {
  const [artists, setArtists] = React.useState(null);  
  const [artistDetails, setArtistDetails] = React.useState(null);  
  const [following, setFollowing] = React.useState();  

  const handleFollow = async (event) => {
    const following = await followArtist(event.target.id);
    console.log(following.status)
    setFollowing(following.status)
  }
  
  const getFollowingArtists = async () => {
    const artists = await getFollowing();
    setArtists(artists.data.artists);
  }
  
  const getArtistDetails = async (artistId) => {
    const user = await getUser();
    const artistDetails = await getAllArtistInfo(artistId, user.data.country);
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
    getFollowingArtists();
  }, [])

  
  if (!artists) {
    return (
      <Loader />
    )
  }

  return ( 
    <main className="content">
      <h1>Following</h1>
      {artistDetails && <InfoCard 
          handleFollow={handleFollow}
          following={following}
          artistDetails={artistDetails}
          handleClick={handleClick} />}
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
 
export default Following;