import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, IconButton, InputAdornment, TextField, Tooltip} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export class TaskForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super(...arguments);

    this.taskForm = React.createRef();
    this.state = {title: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearInput() {
    this.setState({title: ''});
  }

  handleChange(event) {
    this.setState({title: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleSubmit(event);
    } else if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    if (title.length) this.props.handleSubmit(title);
    this.clearInput();
  }

  render() {
    return (
      <FormControl fullWidth sx={{mt: 15}}>
        <TextField
          label="Task"
          variant="standard"
          autoFocus
          maxLength="64"
          placeholder="What needs to be done?"
          inputRef={this.taskForm}
          value={this.state.title}
          InputProps={{
            sx: {fontSize: 32},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Add new task" onClick={this.handleSubmit}>
                  <Tooltip title="Add new task">
                    <AddCircleIcon fontSize="large" />
                  </Tooltip>
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
      </FormControl>
    );
  }
}

export default TaskForm;
