import React from 'react';
import './header.css';
import PropTypes from 'prop-types';
import closeIcon from '../assets/images/icon-close.svg';
import logo from '../assets/images/logo.svg';

function Header({ closeLightBox }) {
  const hasScreenMinWidth600 = window.matchMedia('(min-width: 600px)').matches;
  return (
    <header className="header">
      {hasScreenMinWidth600 ? (
        <img src={logo} alt="logo" className="header__logo" />
      ) : (
        <div className="header__closeIcon">
          <img
            src={closeIcon}
            alt="close icon"
            onClick={closeLightBox}
            role="presentation"
          />
        </div>
      )}
      <div className="header__linkContainer">
        <button type="button" className="header__link">
          home
        </button>
      </div>
      <div className="header__linkContainer">
        <button type="button" className="header__link">
          shop
        </button>
      </div>
      <div className="header__linkContainer">
        <button type="button" className="header__link">
          about
        </button>
      </div>
      <div className="header__linkContainer">
        <button type="button" className="header__link">
          contact
        </button>
      </div>
    </header>
  );
}

Header.defaultProps = {
  closeLightBox: () => null,
};

Header.propTypes = {
  closeLightBox: PropTypes.func,
};

export default Header;
