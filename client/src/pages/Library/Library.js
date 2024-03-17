import React from 'react';

import Loader from "../../components/Loader/Loader";
import { getAlbums, getSearchAlbum } from "../../utils/spotifyService";
// import InfoCard from "../../components/InfoCard/InfoCard";
// import Card from "../../components/Card/Card";

// import { UserContext } from '../../context/userContext';

import Album from "../../components/Album/Album"
import "./Library.css"

const Library = () => {
    //   const { user } = React.useContext(UserContext);
    const [hoveredLetter, setHoveredLetter] = React.useState(null);
    const [albums, setAlbums] = React.useState(null);
    const [albumsByArtist, setAlbumsByArtist] = React.useState(null);
    const [searchResults, setSearchResults] = React.useState(null);


    const [savedAlbums, setSavedAlbums] = React.useState([]);


    const getAllAlbums = async () => {
        const albums = await getAlbums();
        setAlbums(albums);
    }

    React.useEffect(() => {
    }, []);


    const handleMouseEnter = letter => {
        setHoveredLetter(letter);
    };

    const handleMouseLeave = () => {
        setHoveredLetter(null);
    };

    const handleInput = async (event) => {
        const results = await getSearchAlbum(event.target.value);
        setSearchResults(results.data)
    }

    const saveAlbum = (album) => {
        const albumToSave = {
            "id": album.id,
            "artist": album.artists[0].name,
            "name": album.name,
            "image": album.images[0].url,
            "release_date": album.release_date
        }
        const updatedSavedAlbums = [...savedAlbums, albumToSave];

        setSavedAlbums(updatedSavedAlbums)
    }


    if (!savedAlbums) {
        return (
            <Loader />
        )
    }

    return (
        <main>

            {/* Search */}
            <div>
                <input onChange={(event) => handleInput(event)} />
                {searchResults && searchResults.albums && searchResults.albums.items.map((album, index) => (
                    (
                        <>
                            <img src={album.images[0].url} height="200px"/>
                            <button onClick={() => saveAlbum(album)}>Add to library</button>
                        </>
                    )
                ))}
            </div>

            {/* Saved Albums */}
            {savedAlbums.map((album, index) => (
                <div>
                    <Album
                        key={index}
                        image={album.image}
                        index={index}
                    // length={albumsByArtist[letter].length}
                    />
                </div>
            ))}
        </main>
    );
}

export default Library;