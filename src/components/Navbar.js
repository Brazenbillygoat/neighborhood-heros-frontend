
import { useSelector, useDispatch } from 'react-redux';
import { signupOrLogin } from '../actions/loginForm';


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
    {/* <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>    
      </ul>
    </div>   */}
  </nav>

)}

export default Navbar;
