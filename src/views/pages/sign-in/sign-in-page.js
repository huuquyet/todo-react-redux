import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button, Stack, Typography} from '@mui/material';

import {authActions} from 'src/auth';

const SignInPage = ({signInWithGithub, signInWithGoogle, signInWithTwitter}) => {
  return (
    <Stack
      direction="column"
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{height: '100vh'}}>
      <Typography variant="h3">Sign in</Typography>
      <Button
        variant="outlined"
        size="large"
        sx={{width: 1 / 2}}
        onClick={signInWithGithub}>
        GitHub
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{width: 1 / 2}}
        onClick={signInWithGoogle}>
        Google
      </Button>
      <Button
        variant="outlined"
        size="large"
        sx={{width: 1 / 2}}
        onClick={signInWithTwitter}>
        Twitter
      </Button>
    </Stack>
  );
};

SignInPage.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
};

//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signInWithGithub: authActions.signInWithGithub,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter,
};

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));
