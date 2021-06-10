import React from 'react';
import './Search.styles.css';

const Search = ({ display, close }) => {
  if (display !== 'search') {
    return null;
  }

  return (
    <div id="content-about">
      <div id="searchbox">
        <input id="search-input" type="text" placeholder="Search..." /> 
      </div>
    </div>
  );
};

export default Search;