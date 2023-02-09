import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Divider, IconButton, Link, Toolbar, Tooltip} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({authenticated, signOut}) => (
  <AppBar position="fixed">
    <Toolbar>
      <Link
        variant="h4"
        href="/"
        sx={{flexGrow: 1}}
        color="inherit"
        underline="none"
        noWrap>
        Todo React Redux
      </Link>
      <Tooltip title="Sign out">
        <IconButton
          aria-label="Sign out"
          onClick={signOut}
          sx={{visibility: authenticated ? 'visible' : 'hidden'}}>
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Github">
        <IconButton
          href="https://github.com/huuquyet/todo-react-redux"
          aria-label="Github">
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
