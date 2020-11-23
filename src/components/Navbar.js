
import { useSelector, useDispatch } from 'react-redux';
import { signupOrLogin } from '../actions/loginForm';
import { Link } from 'react-router-dom';


function Navbar() {
  const userExists = useSelector(state => state.userExists)
  const dispatch = useDispatch();

  const showLoginOrSignup = () => {
    return !userExists ? "Log in" : "Sign up"
  }

  return (

  <nav className="navbar navbar-expand-md my-nav">
    <Link className="home-link-navbar" to="/home">Neighborhood<br/>Heros</Link>
    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <a className="login-signup-toggle" onClick={() => dispatch(signupOrLogin())}>
        <span>{showLoginOrSignup()}</span>
      </a>
    <div>
        <p className="navbar-list-item">
          <Link className="navbar-sublink" to="/home">Home</Link>
        </p>
        <p className="navbar-list-item">
          <Link className="navbar-sublink" to="/login">Login</Link>
        </p>
        <p className="navbar-list-item">
        <Link className="navbar-sublink" to="/tournament/new">Create Tournament</Link>
        </p>
        <p className="navbar-list-item">
          <Link className="navbar-sublink" to="/users">See users</Link>
        </p>    
    </div>  
  </nav>

)}

export default Navbar;
