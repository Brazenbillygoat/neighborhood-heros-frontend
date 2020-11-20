
import counterReducer from './counter';
import loggedReducer from './isLogged';
import usersReducer from './users';
import usernameReducer from './username';
import passwordReducer from './password';
import confirmPasswordReducer from './confirmPassword';
import userExistsReducer from './userExists';
import selectedUser from './showUser';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  users: usersReducer,
  username: usernameReducer,
  password: passwordReducer,
  confirmPassword: confirmPasswordReducer,
  userExists: userExistsReducer,
  selectedUser: selectedUser
})

export default allReducers;
