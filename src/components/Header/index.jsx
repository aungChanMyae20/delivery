import './Header.css';

const Header = ({ showMobileNav }) => {
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
        <a href="#" className="uk-icon-link social-links" uk-icon="icon: social; ratio: 1"></a>
      </div>
    </header>
  );
};

export default Header;