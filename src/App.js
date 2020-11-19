
import './App.css';
// import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, getUsers } from './actions';
import User from './components/User'
import HomeContainer from './containers/HomeContainer';

const loggedIn = () => {
  if (localStorage.getItem("token") == "true") {
    // return <HomepageContainer />
  }
  // return <LoginContainer />
}




function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const users = useSelector(state => state.users)
  const dispatch = useDispatch();
  
  localStorage.setItem("token", "true")

  const checkIfTrue = async () => {
    if (localStorage.getItem("token") === "true") {
      // debugger
      return dispatch(getUsers())
    }
  }

  const displayUsers = () => {
    return users[0].username
  }


  return (
    <div className="App">
      {/* {loggedIn()} */}
      <p>Hello</p>
      <p>Counter {counter}</p>
      {/* {checkIfTrue()} */}
      <button onClick={() => displayUsers()}>Display Users</button>
      <button onClick={() => dispatch(getUsers())}>Get users in state</button>
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <HomeContainer />


      {isLogged ? <p>Valuable Information I shouldn't see</p> : ''}
      
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return (
//     users: state.users

//   )
// }

export default App;
