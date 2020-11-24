
import './App.css';
// import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions';
import { getTournaments } from './actions/tournaments';
import { Route, Switch, } from 'react-router';

import UserContainer from './containers/UserContainer';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import TournamentForm from './components/TournamentForm';

import HomeContainer from './containers/HomeContainer';
import TournamentContainer from './containers/TournamentContainer';

// const loggedIn = () => {
//   if (localStorage.getItem("token") == "true") {
//     // return <HomepageContainer />
//   }
//   // return <LoginContainer />
// }




function App() {
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  
  const loggedIn = () => {
    if (localStorage.getItem("myId")) {
      // return <HomepageContainer />
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
    // return <LoginContainer />
  }

  localStorage.setItem("token", "true")


  return (
    <div className="App">
      <Navbar />
      {loggedIn()}
      <Switch>
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/tournament/new" component={TournamentForm} />
        <Route exact path="/users" component={UserContainer} />
        <Route exact path="/tournaments" component={TournamentContainer} />
      </Switch>
      {/* <LoginForm /> */}

      {/* <HomeContainer /> */}

      {isLogged ? <p>Valuable Information I shouldn't see</p> : ''}
      
    </div>
  );
}

export default App;
