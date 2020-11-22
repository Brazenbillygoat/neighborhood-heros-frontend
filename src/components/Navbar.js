
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
    <a className="home-link-navbar" href="#">Neighborhood<br/>Heros</a>
    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <a className="login-signup-toggle" onClick={() => dispatch(signupOrLogin())}>
        <span>{showLoginOrSignup()}</span>
      </a>
    <div>
      <ul>
        <li className="nav-item">
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>     */}
      </ul>
    </div>  
  </nav>

)}

export default Navbar;
