import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from '@mui/material';

class Notification extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    actionLabel: PropTypes.string.isRequired,
    dismiss: PropTypes.func.isRequired,
    display: PropTypes.bool.isRequired,
    duration: PropTypes.number,
    message: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.startTimer();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.display) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  startTimer() {
    this.clearTimer();
    this.timerId = setTimeout(() => {
      this.props.dismiss();
    }, this.props.duration || 5000);
  }

  render() {
    return (
      <Alert
        severity="success"
        color="info"
        sx={{position: 'fixed', left: '33%', top: 60, width: 1 / 3}}
        action={
          <Button onClick={this.props.action} color="inherit" size="small">
            {this.props.actionLabel}
          </Button>
        }>
        {this.props.message}
      </Alert>
    );
  }
}

export default Notification;
