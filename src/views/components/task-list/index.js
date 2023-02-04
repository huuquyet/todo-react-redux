import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';

import TaskItem from 'src/views/components/task-item';

function TaskList({deleteTask, tasks, updateTask}) {
  let taskItems = tasks.map((task, index) => {
    return (
      <TaskItem deleteTask={deleteTask} key={index} task={task} updateTask={updateTask} />
    );
  });

  return <div className="task-list">{taskItems}</div>;
}

TaskList.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List).isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;
