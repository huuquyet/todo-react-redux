import React from 'react';
import {List} from 'immutable';
import PropTypes from 'prop-types';
import TaskItem from 'src/views/components/task-item';
import {Divider, Stack} from '@mui/material';

function TaskList({removeTask, tasks, updateTask}) {
  let taskItems = tasks.map((task, index) => {
    return (
      <TaskItem key={index} task={task} removeTask={removeTask} updateTask={updateTask} />
    );
  });

  return <Stack divider={<Divider />}>{taskItems}</Stack>;
}

TaskList.propTypes = {
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;
