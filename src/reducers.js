import {combineReducers} from '@reduxjs/toolkit';
import {connectRouter} from 'connected-react-router';

import {authReducer} from './auth';
import {notificationReducer} from './notification';
import {tasksReducer} from './tasks';

const createRootReducer = (history) =>
  combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    tasks: tasksReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
