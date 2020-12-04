
import { useSelector, useDispatch } from 'react-redux';
import { signupOrLogin } from '../actions/loginForm';
import { Link } from 'react-router-dom';
import { tournamentMembers } from '../actions/tournamentMembers';


function Navbar() {
  const userExists = useSelector(state => state.userExists);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const showLoginOrSignup = () => {
    if (localStorage.getItem("myId")) {
      return <p class="logout-or-login" onClick={() => localStorage.clear()}>Log out</p>
    }
    return !userExists ? "Log in" : "Sign up"
  }

  const userMembers = () => {
    let participants = [];
    for (let user of users) {
      if (user.id != localStorage.getItem("myId")) {
        participants.push(user)
      }
    }
    return participants;
  }

  const isLoggedIn = () => {
    if (localStorage.getItem("myId")) {
      return (
        <>
          <p className="navbar-list-item">
            <Link className="navbar-sublink" to="/home">Profile</Link>
          </p>
          <p className="navbar-list-item">
            <Link className="navbar-sublink" to="/tournament/new">Create Tournament</Link>
          </p>
          <p className="navbar-list-item">
            <Link className="navbar-sublink" to="/users">See Users</Link>
          </p>  
          <p className="navbar-list-item">
            <Link className="navbar-sublink" onClick={() => dispatch(tournamentMembers(userMembers()))} to="/tournaments">Active Tournaments</Link>
          </p> 
        </>
      )
    }
  }

  return (

  <nav className="navbar navbar-expand-md my-nav">
    <Link className="home-link-navbar" to="/home">Neighborhood<br/>Heroes</Link>
    <p>
      <Link to="/login" 
            className="login-signup-toggle"
            onClick={() => dispatch(signupOrLogin())}>
            <span>{showLoginOrSignup()}</span>
      </Link>
    </p>
    <div>
      <p className="navbar-list-item">
        <Link className="navbar-sublink" to="/home">Home</Link>
      </p>
      {isLoggedIn()}
    </div>  
  </nav>

)}

export default Navbar;
