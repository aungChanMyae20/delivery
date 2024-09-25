import { useState } from 'react';
import './Header.css';

const Header = ({ showMobileNav }) => {
  const [socialVisible, setSocialVisible] = useState(false);

  return (
    <header className="uk-navbar-container uk-navbar navbar" uk-navbar="true" uk-sticky="position: top">
      <div className="uk-navbar-left navbar-left">
        <button
          className="uk-button uk-button-primary mobile-toggle-btn uk-hidden@m"
          onClick={() => showMobileNav(true)}
        >
          <span uk-icon="menu" style={{ color: '#fff'}} />
        </button>
        <a href="/" className="uk-navbar-item uk-logo logo">
          <img src='/images/logo.webp' alt="Logo" />
        </a>
        <h1 className="company-name">Global Trade Barometer</h1>
      </div>
      <div className="uk-navbar-right navbar-right uk-visible@m">
        <div className={`social-links ${socialVisible ? 'visible': ''}`}>
          <div className="social-links-box">
            <a href="#" className="uk-link-icon" uk-icon="icon: facebook; ratio: 1.3" />
            <a href="#" className="uk-link-icon" uk-icon="icon: x; ratio: 1.3" />
            <a href="#" className="uk-link-icon" uk-icon="icon: linkedin; ratio: 1.3" />
          </div>
        </div>
        <button
          className="uk-button uk-button-link social-link" uk-icon="icon: social; ratio: 1" 
          onClick={() => setSocialVisible(!socialVisible)}
        />
      </div>
    </header>
  );
};

export default Header;