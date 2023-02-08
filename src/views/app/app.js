import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {Container, CssBaseline} from '@mui/material';

import {authActions, getAuth} from 'src/auth';
import Header from 'src/views/components/header';
import RequireAuthRoute from 'src/views/components/require-auth-route';
import RequireUnauthRoute from 'src/views/components/require-unauth-route';
import SignInPage from 'src/views/pages/sign-in';
import TasksPage from 'src/views/pages/tasks';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = ({authenticated, signOut}) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Header authenticated={authenticated} signOut={signOut} />

    <Container maxWidth="sm">
      <RequireAuthRoute
        authenticated={authenticated}
        exact
        path="/"
        component={TasksPage}
      />
      <RequireUnauthRoute
        authenticated={authenticated}
        path="/sign-in"
        component={SignInPage}
      />
    </Container>
  </ThemeProvider>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
