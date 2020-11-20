
import { useSelector, useDispatch } from 'react-redux';
import { signupOrLogin } from '../actions/loginForm';


function Navbar() {
  const userExists = useSelector(state => state.userExists)
  const dispatch = useDispatch();

  const showLoginOrSignup = () => {
    return !userExists ? "Log in" : "Sign up"
  }

  return (

  <nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <a class="home-link-navbar" href="#">Neighborhood<br/>Heros</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="login-signup-toggle" onClick={() => dispatch(signupOrLogin())}>
        <span>{showLoginOrSignup()}</span>
      </a>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>    
      </ul>
    </div>  
  </nav>

)}

export default Navbar;
