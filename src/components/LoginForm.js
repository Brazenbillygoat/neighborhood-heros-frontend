
import { useSelector, useDispatch } from 'react-redux';
import { username, password, confirmPassword } from '../actions/loginForm';
import { Redirect } from 'react-router-dom';
// import userExists from '../reducers/userExists';


function LoginForm() {
  const myUsername = useSelector(state => state.username);
  const myPassword = useSelector(state => state.password);
  const myConfirmPassword = useSelector(state => state.confirmPassword);
  const userExists = useSelector(state => state.userExists);
  const dispatch = useDispatch();


  const showLoginOrSignup = () => {
    return userExists ? "Log in" : "Sign up"
  }

  const loginOrCreate = (e) => {
    return userExists ? logUserIn(e) : createNewUser(e)
  }

  const passwordsMatchOnSignup = () => {
    if (myPassword 
        && 
        myConfirmPassword
        && 
        myPassword !== myConfirmPassword) {
      return <small className="signup-password-validation">Passwords must match.</small>
    }
  }

  const createNewUser = (e) => {
    e.preventDefault();
    if (myPassword && myConfirmPassword) {
      let login = {
        name: myUsername,
        password: myPassword
      }
      
      fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem("myId", user.id)
        localStorage.setItem("username", user.username)
        if (localStorage.getItem("myId") != "undefined") {
          window.location.href="/home";
        }

      })
    } else {
      
      return <p>passwords must match</p>
    }
  }
  
  const logUserIn = (e) => {
    e.preventDefault();
    let login = {
      name: myUsername,
      password: myPassword
    }
    
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(res => res.json())
    .then(user => {
      localStorage.setItem("myId", user.id)
      localStorage.setItem("username", user.username)
      window.location.href="/home";
    })
    .catch((err) => {
      document.getElementById("fetching-errors").hidden = false
      setTimeout(() => {
        document.getElementById("fetching-errors").hidden = true
      }, 3000);
    })
  }

  const passwordConfirmation = () => {
    if (!userExists) {
      return (
        <div>
          <label>
            <h4>Password:</h4>
            <input className="login-input"
                  type="password" 
                  value={myPassword}
                  onChange={(e) => dispatch(password(e.target.value))}
            />
            <br />
            {passwordsMatchOnSignup()}
            <h4>Re-enter Password:</h4>
              <input className="login-input"
                    type="password" 
                    value={myConfirmPassword}
                    onChange={(e) => dispatch(confirmPassword(e.target.value))}
              />
          </label>  
        </div>
      )
    }
    return (
      <label>
      <h4>Password:</h4>
        <input className="login-input"
              type="password" 
              value={myPassword}
              onChange={(e) => dispatch(password(e.target.value))}
        />
      </label>
    )
  }


  return (
    <div>

        <p small className="signup-password-validation" id="fetching-errors" hidden="true"><strong>Username or password is incorrect.</strong></p>
        <form onSubmit={loginOrCreate}>
          <h2 className="login-header">{showLoginOrSignup()}</h2>
          <label>
            <h4>Username:</h4>
            <input className="login-input"
                   type="text" 
                   value={myUsername} 
                   onChange={(e) => dispatch(username(e.target.value))} 
            />
          </label>
          <br/>
          {passwordConfirmation()}
          <br/>
          <input className="btn btn-primary" type="submit" value={showLoginOrSignup()} />
        </form>

    </div>
  )
}


export default LoginForm;


