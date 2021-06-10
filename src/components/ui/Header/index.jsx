import React from 'react';
import './Header.styles.css';
import NavMenu from '../NavMenu';
import logo from '../../../assets/img/logo.svg';

const Header = ({ handler }) => {
  const rootUrl = window.location.href;

  return (
    <div className="header">
      <div id="logo-wrapper">
        <a href={rootUrl} id="home-logo">
          <img src={logo} alt="logo"></img>
        </a>
      </div>
      <div id="nav-menu-wrapper">
        <NavMenu handler={handler} />
      </div>
    </div>
  );
};

export default Header;