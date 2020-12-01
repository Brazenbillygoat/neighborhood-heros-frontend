
import {combineReducers} from 'redux';
import loggedReducer from './isLogged';
import usersReducer from './users';
import usernameReducer from './username';
import passwordReducer from './password';
import confirmPasswordReducer from './confirmPassword';
import userExistsReducer from './userExists';
import selectedUser from './showUser';
import tournament from './tournamentReducer';
import tournaments from './tournamentsReducer';
import selectedTournament from './tournamentReducer';
import newTournamentReducer from './newTournamentReducer';
import newTaskReducer from './newTaskReducer';

const allReducers = combineReducers({
  isLogged: loggedReducer,
  users: usersReducer,
  username: usernameReducer,
  password: passwordReducer,
  confirmPassword: confirmPasswordReducer,
  userExists: userExistsReducer,
  selectedUser: selectedUser,
  newTournament: newTournamentReducer,
  newTask: newTaskReducer,
  tournament: tournament,
  tournaments: tournaments,
  selectedTournament: selectedTournament

})

export default allReducers;
