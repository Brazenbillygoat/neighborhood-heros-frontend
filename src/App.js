
import './App.css';
// import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions';
import { Route, Switch, } from 'react-router';

import UserContainer from './containers/UserContainer';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import TournamentForm from './components/TournamentForm';

import HomeContainer from './containers/HomeContainer';

// const loggedIn = () => {
//   if (localStorage.getItem("token") == "true") {
//     // return <HomepageContainer />
//   }
//   // return <LoginContainer />
// }




function App() {
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  
  localStorage.setItem("token", "true")

  return (
    <div className="App">
      <Navbar />
      <button onClick={() => dispatch(getUsers())}>Get users in state</button>
      <Switch>
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/tournament/new" component={TournamentForm} />
        <Route exact path="/users" component={UserContainer} />
      </Switch>
      {/* <LoginForm /> */}

      {/* <HomeContainer /> */}

      {isLogged ? <p>Valuable Information I shouldn't see</p> : ''}
      
    </div>
  );
}

export default App;
