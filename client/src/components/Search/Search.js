import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


import "./Search.scss";

const Search = (props) => {
  const {handleSubmit, handleChange, searchQuery } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FontAwesomeIcon icon={faSearch} />
      <input placeholder="Search" onChange={handleChange} value={searchQuery}/>
    </form>
    );
}
 
export default Search;

