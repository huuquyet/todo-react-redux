import React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/views/components/button';
import GitHubLogo from 'src/views/components/github-logo';
import './header.scss';

const Header = ({authenticated, signOut}) => (
  <header className="header">
    <div className="g-row">
      <div className="g-col">
        <h1 className="header__title">Todo React Redux</h1>

        <ul className="header__actions">
          {authenticated ? (
            <li>
              <Button onClick={signOut}>Sign out</Button>
            </li>
          ) : null}
          <li>
            <a
              className="link link--github"
              href="https://github.com/r-park/todo-react-redux">
              <GitHubLogo />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
