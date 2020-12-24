
import {combineReducers} from 'redux';
import loggedReducer from './isLogged';
import usersReducer from './users';
// import usernameReducer from './username';
// import passwordReducer from './password';
// import confirmPasswordReducer from './confirmPassword';
import userExistsReducer from './userExists';
import selectedUser from './showUser';
import tournament from './tournamentReducer';
import tournaments from './tournamentsReducer';
import selectedTournament from './tournamentReducer';
import newTournamentReducer from './newTournamentReducer';
import newTaskReducer from './newTaskReducer';
import pastTournaments from './pastTournamentsReducer';
import proxyUpdate from './proxyReducer';
import myPoints from './myPointsReducer';
import winners from './winnersReducer';
import newUser from './newUserReducer';

const allReducers = combineReducers({
  users: usersReducer,
  newUser: newUser,
  tournaments: tournaments,
  selectedTournament: selectedTournament,
  newTournament: newTournamentReducer,
  newTask: newTaskReducer,
  isLogged: loggedReducer,
  userExists: userExistsReducer,
  // username: usernameReducer,
  // password: passwordReducer,
  // confirmPassword: confirmPasswordReducer,
  selectedUser: selectedUser,
  tournament: tournament,
  pastTournaments: pastTournaments,
  proxy: proxyUpdate,
  myPoints: myPoints,
  winners: winners
})

export default allReducers;
