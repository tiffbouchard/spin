import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from '../../components/Sidebar/Sidebar';
import TopArtists from "../TopArtists/TopArtists";
import Following from "../Following/Following";
import Random from "../Random/Random";
import SearchResults from "../SearchResults/SearchResults";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import Modal from "../../components/Modal/Modal";
import { getSearch, token } from "../../utils/spotifyService";
import { UserContext } from '../../context/userContext';
import Loader from '../../components/Loader/Loader';
import { SettingsContext } from '../../context/settingsContext';
import Library from "../Library/Library"


import './Layout.scss';


const Layout = (props) => {
    const { user }= React.useContext(UserContext);
    const { history } = props;

    const [ hoverToPlay, setHoverToPlay ] = React.useState(true);
    const value = {  hoverToPlay };

    const [searchQuery, setSearchQuery] = React.useState();
    const [results, setResults] = React.useState();
    const [loading, setLoading] = React.useState();
    const [searching, setSearching] = React.useState();
    const [modal, setModal] = React.useState(true);  

    const closeModal = () => {
      setModal(false);
    }


    const setHoverToPlaySetting = (pref) => {
      setHoverToPlay(pref);
    }

  
    const handleChange = async (event) => {
      setLoading(true);
      setSearching(true);
      history.push(`/search`); 
      setSearchQuery(event.target.value);
      const searchResults = await getSearch(searchQuery);
      setResults(searchResults.data.artists.items);
      setLoading(false);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setSearching(true);
      history.push(`/search`); 
      const searchResults = await getSearch(searchQuery);
      setResults(searchResults.data.artists.items);
      setLoading(false);
    }


    if (!user) {
      return (
        <Loader/>
      )
    }

    return (
      <>
      <SettingsContext.Provider value={value}>
        <MobileHeader/>
        {/* {modal && <Modal closeModal={closeModal} title={`Welcome back, ${user.display_name}!`} type="welcome"/>} */}
        <div className="row">
            {/* <Sidebar
              searching={searching}
            /> */}
            <div className="main">
              {/* <Header
                hoverToPlay={hoverToPlay}
                setHoverToPlaySetting={setHoverToPlaySetting}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              /> */}
                <Switch>
                  <Route 
                    exact path="/"
                    render={() => token ? <Library/> : <Redirect to="/login"/>}
                  /> 
                  <Route 
                    exact path="/top"
                    render={() => token ? <Library/> : <Redirect to="/login"/>}
                  /> 
                  <Route 
                    exact path="/following"
                    render={() => token ? <Library/> : <Redirect to="/login"/>}
                  /> 
                  <Route 
                    exact path="/random"
                    render={() => token ? <Library/> : <Redirect to="/login"/>}
                  /> 
                  <Route 
                  exact path="/search"
                  render={() => token ?
                  <SearchResults
                    loading={loading}
                    results={results}
                    searchQuery={searchQuery}
                  /> 
                  :
                  <Redirect to="/"/>
                  }
                  /> 
                </Switch>
            </div>
          </div>
      </SettingsContext.Provider>
      </>
    );
}

export default Layout;