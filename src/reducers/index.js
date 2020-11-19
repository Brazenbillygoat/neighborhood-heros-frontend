
import counterReducer from './counter';
import loggedReducer from './isLogged';
import usersReducer from './users';
import selectedUser from './showUser';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  users: usersReducer,
  selectedUser: selectedUser
})

export default allReducers;
