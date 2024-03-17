import React from 'react';
import { token } from "../../utils/spotifyService";
import Layout from "../../pages/Layout/Layout"
import LoginPage from "../../pages/LoginPage/LoginPage";

const App = (props) => { 
  
  const [accessToken, setAccessToken] = React.useState('');

  React.useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <>
    {accessToken ? <Layout {...props}/> : <LoginPage/> }
    </>
  );
}

export default App;