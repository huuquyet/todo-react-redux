import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Box, IconButton, Stack, TextField, Tooltip, Typography} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export class TaskItem extends Component {
  constructor() {
    super(...arguments);

    this.state = {editing: false};
    this.titleInput = React.createRef();

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({editing: true});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    } else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  remove() {
    this.props.removeTask(this.props.task);
  }

  save(event) {
    if (this.state.editing) {
      const {task} = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== task.title) {
        this.props.updateTask(task, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    const {task} = this.props;
    this.props.updateTask(task, {completed: !task.completed});
  }

  renderTitle(task) {
    return (
      <Typography
        variant="body1"
        onClick={this.toggleStatus}
        sx={{
          flexGrow: 1,
          fontSize: 22,
          textDecoration: task.completed ? 'line-through' : 'none',
        }}>
        {task.title}
      </Typography>
    );
  }

  renderTitleInput(task) {
    return (
      <TextField
        fullWidth
        variant="standard"
        autoFocus
        defaultValue={task.title}
        maxLength="64"
        onKeyUp={this.handleKeyUp}
        label="Edit task"
        InputProps={{
          sx: {fontSize: 22},
        }}
        inputRef={this.titleInput}
      />
    );
  }

  render() {
    const {editing} = this.state;
    const {task} = this.props;

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Task completed?">
          <IconButton
            aria-label="Status"
            sx={{visibility: editing ? 'hidden' : 'visible'}}
            onClick={this.toggleStatus}>
            {task.completed ? (
              <CheckCircleIcon fontSize="large" />
            ) : (
              <CheckCircleOutlineIcon fontSize="large" />
            )}
          </IconButton>
        </Tooltip>

        <Box sx={{flexGrow: 1}}>
          {editing ? this.renderTitleInput(task) : this.renderTitle(task)}
        </Box>
        {/* <Tooltip title='Save'><IconButton aria-label="Save" sx={{display: !editing ? 'none' : 'block'}}
           onClick={this.save}>
            <CheckCircleOutlineIcon fontSize='large'/></IconButton></Tooltip> */}

        <Tooltip title="Edit task">
          <IconButton
            aria-label="Edit task"
            sx={{display: editing ? 'none' : 'block'}}
            onClick={this.edit}>
            <ModeEditIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel">
          <IconButton
            aria-label="Cancel"
            sx={{display: !editing ? 'none' : 'block'}}
            onClick={this.stopEditing}>
            <CancelIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete task">
          <IconButton
            aria-label="Delete task"
            sx={{visibility: editing ? 'hidden' : 'visible'}}
            onClick={this.remove}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }
}

TaskItem.propTypes = {
  removeTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskItem;
