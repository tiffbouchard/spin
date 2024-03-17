import Button from "../../components/Button/Button";

import logo from "../../images/Spotify_Icon_RGB_White.png";

import './LoginPage.scss';

const LoginPage = () => {
  console.log("NODE_ENV:", process.env.NODE_ENV); // Add this line to log NODE_ENV

  return (
    <main className="login">
      <h1>Artist Explorer</h1>
      <Button logo={logo} link={!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8888/login" : "http://artist-explorer.herokuapp.com/login"} label="Login with Spotify" />
    </main>
    );
}
 
export default LoginPage;