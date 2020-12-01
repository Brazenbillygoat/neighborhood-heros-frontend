
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions';
import { getTournaments } from './actions/tournaments';
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


function App() {
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const logInOrHome = () => {
    if (localStorage.getItem("myId")) {
      return <Redirect to='home' />
    } else {
      return <Redirect to='login' />
    }
  }
  
  const loggedIn = () => {
    if (localStorage.getItem("myId")) {
      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(users => {
        dispatch(getUsers(users));
      })

      fetch('http://localhost:3000/tournaments')
      .then(res => res.json())
      .then(tournaments => {
        dispatch(getTournaments(tournaments));
      })
    }
  }

  localStorage.setItem("token", "true")


  return (
    <div className="App">
      <Navbar />
      {loggedIn()}
      {/* <BrowserRouter> */}
      {logInOrHome()}
        <Switch>
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/tournament/new" component={TournamentForm} />
          <Route exact path="/users" component={UserContainer} />
          <Route exact path="/tournaments" component={TournamentContainer} />
          <Route path="/tournament/:id" component={ShowTournament} />
          <Route path="/tasks/new" component={TaskForm} />
        </Switch>
      {/* </BrowserRouter> */}
      
    </div>
  );
}

export default App;
