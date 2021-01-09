
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions';
import { getTournaments, pastTournaments } from './actions/tournaments';
// import { addWinners } from './actions/winners';
import { Route, Switch, } from 'react-router';
import { BrowserRouter, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import TournamentForm from './components/TournamentForm';
import ShowTournament from './components/ShowTournament';
import TaskForm from './components/TaskForm';

import UserContainer from './containers/UserContainer';
import HomeContainer from './containers/HomeContainer';
import TournamentContainer from './containers/TournamentContainer';
import { tournamentDescription } from './actions/tournamentForm';


function App() {
  const isLogged = useSelector(state => state.isLogged);
  const winners = useSelector(state => state.winners);
  const dispatch = useDispatch();

  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://neighborhood-heroes-backend.herokuapp.com";

  //this is a helper method for deciding to send the client to the login page or to  the home page
  //depending on whether the client is logged in as a user
  const logInOrHome = () => {
    if (localStorage.getItem("myId")) {
      return <Redirect to='home' />
    } else {
      return <Redirect to='login' />
    }
  }
  
  //this checks is if a client is logged in as a user and if they are
  //loads users and tournaments into state
  const loggedIn = () => {
    if (localStorage.getItem("myId")) {
      fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(users => {
        dispatch(getUsers(users));
      })

      fetch(`${baseUrl}/tournaments`)
      .then(res => res.json())
      .then(tournaments => {
        let endedTournaments = [];
        let activeTournaments = [];
        //dividing tournaments into active or past depending on enddate
        tournaments.forEach((tournament) => {
          let endDateArray = tournament.end_date.split(/\D+/);
          let endDate = new Date(
            parseInt(endDateArray[0]),
            parseInt(endDateArray[1] - 1),
            parseInt(endDateArray[2]),
            parseInt(endDateArray[3]),
            parseInt(endDateArray[4])
          )
          if (endDate.getTime() >= Date.now()) {
            activeTournaments.push(tournament)
          } else {
            // endedTournaments.push(tournament)
          }
        })
        dispatch(getTournaments(activeTournaments));
        dispatch(pastTournaments(endedTournaments));
      })
    }
  }

  localStorage.setItem("token", "true");
  localStorage.setItem("isAMember", false);


  return (
    <div className="App">
      <Navbar />
      {loggedIn()}
      {logInOrHome()}
        <Switch>
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/tournament/new" component={TournamentForm} />
          <Route exact path="/users" component={UserContainer} />
          <Route exact path="/tournaments" component={TournamentContainer} />
          <Route exact path="/tournament/home" component={TournamentContainer} />
          <Route path="/tournament/:id" component={ShowTournament} />
          <Route path="/tasks/new" component={TaskForm} />
        </Switch>
    </div>
  );
}

export default App;
