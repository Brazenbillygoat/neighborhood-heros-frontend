
import { useSelector, useDispatch } from 'react-redux';
import { signupOrLogin } from '../actions/loginForm';
import { Link } from 'react-router-dom';
import { getUsers } from '../actions';
import { getTournaments, pastTournaments } from '../actions/tournaments';
// import { tournamentMembers } from '../actions/tournamentMembers';


function Navbar() {
  const userExists = useSelector(state => state.userExists);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();


  const fetchUsers = () => {
    if (localStorage.getItem("myId")) {
      fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(users => {
        dispatch(getUsers(users));
      })
    }
  }

  const fetchTournaments = () => {
    fetch('http://localhost:3000/tournaments')
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

  const showLoginOrSignup = () => {
    if (localStorage.getItem("myId")) {
      return <p class="logout-or-login" onClick={() => localStorage.clear()}>Log out</p>
    }
    return !userExists ? "Log in" : "Sign up"
  }

  const isLoggedIn = () => {
    if (localStorage.getItem("myId")) {
      return (
        <>
          <p className="navbar-list-item">
          {/* adjust below route to take an id number */}
            <Link className="navbar-sublink" to="/profile/:id">Profile</Link> 
          </p>
          <p className="navbar-list-item">
            <Link className="navbar-sublink" to="/tournament/new">Create Tournament</Link>
          </p>
          <p className="navbar-list-item">
            <Link className="navbar-sublink" to="/users">See Users 1</Link>
          </p>  
          <p className="navbar-list-item">
            <Link className="navbar-sublink" to="/tournaments" onClick={() => fetchTournaments()}>Active Tournaments</Link>
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
