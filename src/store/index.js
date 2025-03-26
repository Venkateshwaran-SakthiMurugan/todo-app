import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import taskReducer from './reducers/taskReducer';
import calendarReducer from './reducers/calendarReducer';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  calendar: calendarReducer
});

// Create store with thunk middleware for async actions
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;