import React from 'react';
import './Header.styles.css';
import NavMenu from '../NavMenu';

const Header = ({ handler }) => {
  const rootUrl = window.location.href;

  return (
    <div className="header">
      <div id="logo-wrapper">
        <a href={rootUrl} id="home-logo">rebase radio</a>
      </div>
      <div id="nav-menu-wrapper">
        <NavMenu handler={handler} />
      </div>
    </div>
  );
};

export default Header;