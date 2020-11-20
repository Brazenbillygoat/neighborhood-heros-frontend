
import { useSelector, useDispatch } from 'react-redux';
import { username, password, confirmPassword, signupOrLogin } from '../actions/loginForm';
import userExists from '../reducers/userExists';


function LoginForm() {
  const myUsername = useSelector(state => state.username);
  const myPassword = useSelector(state => state.password);
  const myConfirmPassword = useSelector(state => state.confirmPassword);
  const userExists = useSelector(state => state.userExists);
  const dispatch = useDispatch();

  const showLoginOrSignup = () => {
    return userExists ? "Log in" : "Sign up"
  }

  const passwordsMatchOnSignup = () => {
    if (myPassword 
        && 
        myConfirmPassword
        && 
        myPassword !== myConfirmPassword) {
      return <small class="signup-password-validation">Passwords must match.</small>
    }
  }

  const logUserIn = async () => {
    let login = {
      name: myUsername,
      password: myPassword
    }

    const res = await fetch(`${baseUrl}/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    const currentUser = await res.json()
    console.log(currentUser)
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

        <form onSubmit={(e) => console.log(e.target.value)}>
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
          <input className="btn btn-primary" type="submit" value="login" />
        </form>

    </div>
  )
}


export default LoginForm;
