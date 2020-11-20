
import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions';
import User from './components/User';
import LoginForm from './components/LoginForm';
import HomeContainer from './containers/HomeContainer';
import Navbar from './components/Navbar';

// const loggedIn = () => {
//   if (localStorage.getItem("token") == "true") {
//     // return <HomepageContainer />
//   }
//   // return <LoginContainer />
// }




function App() {
  const isLogged = useSelector(state => state.isLogged);
  // const users = useSelector(state => state.users)
  const dispatch = useDispatch();
  
  localStorage.setItem("token", "true")

  // const checkIfTrue = async () => {
  //   if (localStorage.getItem("token") === "true") {
  //     // debugger
  //     return dispatch(getUsers())
  //   }
  // }

  // const displayUsers = () => {
  //   return users[0].username
  // }
  
  useEffect(() => {
    dispatch(getUsers())
  }, [])


  return (
    <div className="App">
      <Navbar />
      <button onClick={() => dispatch(getUsers())}>Get users in state</button>

      {/* <HomeContainer /> */}
      <LoginForm />


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
