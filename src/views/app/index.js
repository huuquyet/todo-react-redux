import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {authActions, getAuth} from 'src/core/auth';
import {paths} from 'src/views/routes';
import Header from 'src/views/components/header';


export class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {router} = this.context;
    const {auth} = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(paths.SIGN_IN);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(paths.TASKS);
    }
  }

  render() {
    return (
      <div>
        <Header
          authenticated={this.props.auth.authenticated}
          signOut={this.props.signOut}
        />

        <main className="main">{this.props.children}</main>
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth})
);

export default connect(
  mapStateToProps,
  authActions
)(App);
