import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Stack} from '@mui/material';

const TaskFilters = ({filter}) => (
  <Stack direction="row" spacing={2} sx={{mb: 4}}>
    <NavLink
      to="/"
      style={{color: 'inherit', textDecoration: !filter ? 'underline' : 'none'}}>
      View All
    </NavLink>
    <NavLink
      to={{pathname: '/', search: '?filter=active'}}
      style={{
        color: 'inherit',
        textDecoration: filter === 'active' ? 'underline' : 'none',
      }}>
      Active
    </NavLink>
    <NavLink
      to={{pathname: '/', search: '?filter=completed'}}
      style={{
        color: 'inherit',
        textDecoration: filter === 'completed' ? 'underline' : 'none',
      }}>
      Completed
    </NavLink>
  </Stack>
);

TaskFilters.propTypes = {
  filter: PropTypes.string,
};

export default TaskFilters;
