import axios from 'axios';
import { getHashParams } from './paramsService';

const EXPIRATION_TIME = 3600 * 1000; 

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken(); 
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    window.location.replace("http://localhost:3000");
  } else {
    window.location.replace("http://artist-explorer.herokuapp.com");
  }
};

// API CALLS ***************************************************************************************

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const getSearchAlbum = searchQuery =>
  axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=album&limit=5`, { headers });


export const getSearch = searchQuery =>
  axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist&limit=40`, { headers });


export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });


export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=50', { headers });


export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers,
  });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });


export const getArtist = artistId =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });


export const getRelated= artistId =>
  axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, { headers });


const getArtistTopTracks= (artistId, market) =>
  axios.get(` https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`, { headers });


export const followArtist = artistId => {
  const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
  return axios({ method: 'put', url, headers });
};

export const doesUserFollowArtist = artistId =>
  axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {
    headers,
  });

export const createPlaylist = (userId, name) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = JSON.stringify({ name });
  return axios({ method: 'post', url, headers, data });
};

export const addTracksToPlaylist = (playlistId, uris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
  return axios({ method: 'post', url, headers });
};


export const getRecommendationsForArtist = artists => {
  return axios.get(
    `https://api.spotify.com/v1/recommendations?seed_artists=${artists}&limit=1`,
    {
      headers,
    },
  );
};

export const getTrack = trackId =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

  
export const getAllArtistInfo = (artistId, market) =>
  axios
    .all([getArtist(artistId), getRelated(artistId), getArtistTopTracks(artistId, market), doesUserFollowArtist(artistId)])
    .then(
      axios.spread((artist, related, topTracks, doesFollow) => ({
        artist: artist.data,
        related: related.data,
        topTracks: topTracks.data,
        doesFollow: doesFollow.data[0]
      })),
    );    

export const getAlbums = (limit, offset) =>
  axios.get(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`, {
    headers,
  });