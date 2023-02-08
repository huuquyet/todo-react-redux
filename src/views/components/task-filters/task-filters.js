import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {Link, Stack, Typography} from '@mui/material';

const LinkBehavior = React.forwardRef((props, ref) => (
  <NavLink ref={ref} {...props} role={undefined} />
));

const TaskFilters = ({filter}) => (
  <Stack direction="row" spacing={2} sx={{mb: 4}}>
    <Link component={LinkBehavior} to="/" color="inherit" underline="none">
      <Typography sx={{fontWeight: !filter ? 'bold' : ''}}>View All</Typography>
    </Link>
    <Link
      component={LinkBehavior}
      color="inherit"
      underline="none"
      to={{pathname: '/', search: '?filter=active'}}>
      <Typography sx={{fontWeight: filter === 'active' ? 'bold' : ''}}>Active</Typography>
    </Link>
    <Link
      component={LinkBehavior}
      color="inherit"
      underline="none"
      to={{pathname: '/', search: '?filter=completed'}}>
      <Typography sx={{fontWeight: filter === 'completed' ? 'bold' : ''}}>
        Completed
      </Typography>
    </Link>
  </Stack>
);

TaskFilters.propTypes = {
  filter: PropTypes.string,
};

export default TaskFilters;
