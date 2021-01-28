
import { useSelector, useDispatch } from 'react-redux';
import { username, password, confirmPassword } from '../actions/loginForm';
import { getUsers } from '../actions';
import { getTournaments, pastTournaments } from '../actions/tournaments';
import { Redirect } from 'react-router-dom';
// import userExists from '../reducers/userExists';


function LoginForm() {
  const myUsername = useSelector(state => state.newUser.username);
  const myPassword = useSelector(state => state.newUser.password);
  const myConfirmPassword = useSelector(state => state.newUser.confirmPassword);
  const userExists = useSelector(state => state.userExists);
  const dispatch = useDispatch();


  const baseUrl = "http://localhost:3000";
  // const baseUrl = "https://neighborhood-heroes-backend.herokuapp.com";

  const showLoginOrSignup = () => {
    return !userExists ? "Log in" : "Sign up";
  }

  const loginOrCreate = (e) => {
    return !userExists ? logUserIn(e) : createNewUser(e);
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
      
      fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })
      .then(res => res.json())
      .then(user => {
        fetch(`${baseUrl}/users`)
        .then(res => res.json())
        .then(users => {
          dispatch(getUsers(users));
        })
        fetch(`${baseUrl}/tournaments`)
        .then(res => res.json())
        .then(tournaments => {
          let endedTournaments = [];
          let activeTournaments = [];
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
              activeTournaments.push(tournament);
            } else {
              endedTournaments.push(tournament);
            }
          })
          dispatch(getTournaments(activeTournaments));
          dispatch(pastTournaments(endedTournaments));
        })
        localStorage.setItem("myId", JSON.stringify(user))
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
    fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(res => res.json())
    .then(user => {
      fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(users => {
        dispatch(getUsers(users));
      })
      // fetch(`${baseUrl}/tournaments`)
      // .then(res => res.json())
      // .then(tournaments => {
      //   let endedTournaments = [];
      //   let activeTournaments = [];
      //   tournaments.forEach((tournament) => {
      //     let endDateArray = tournament.end_date.split(/\D+/);
      //     let endDate = new Date(
      //       parseInt(endDateArray[0]),
      //       parseInt(endDateArray[1] - 1),
      //       parseInt(endDateArray[2]),
      //       parseInt(endDateArray[3]),
      //       parseInt(endDateArray[4])
      //     )
      //     console.log(endDate)
      //     if (endDate.getTime() >= Date.now()) {
      //       activeTournaments.push(tournament);
      //     } else {
      //       endedTournaments.push(tournament);
      //     }
      //   })
      //   dispatch(getTournaments(activeTournaments));
      //   dispatch(pastTournaments(endedTournaments));
      // })
      localStorage.setItem("myId", JSON.stringify(user))
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
    if (userExists) {
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
                    required
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
              required
        />
      </label>
    )
  }


  return (
    <div>

        <p small id="fetching-errors" hidden="true"><strong>Username or password is incorrect.</strong></p>
        <form className="login-signup-form" onSubmit={loginOrCreate}>
          <h2 className="login-header">{showLoginOrSignup()}</h2>
          <label>
            <h4>Username:</h4>
            <input className="login-input"
                   type="text" 
                   value={myUsername} 
                   onChange={(e) => dispatch(username(e.target.value))} 
                   required
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


