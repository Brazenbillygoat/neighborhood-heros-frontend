import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showTournament } from '../actions/tournaments';



const ShowTournament = () => {

  const dispatch = useDispatch();

  // const getShowTournament = () => {
  //   dispatch(showTournament(JSON.parse(localStorage.getItem("showTournament"))))
  // }

  const users = useSelector(state => state.users);
  const tournaments = useSelector(state => state.tournaments);
  const tournament = JSON.parse(localStorage.getItem("showTournament"));

  
  const displayJoinButton = () => {
    let userIsMember = false;
    for (let user of tournament.users) {
      if (user.id == localStorage.getItem("myId")) {
        userIsMember = true;
      }
    }

    if (userIsMember) {
    return <Link 
      className="tournament-button btn"
      onClick={() => leaveTournament()} 
      to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
      Leave Tournament
    </Link> 
    } else {
    return <Link 
      className="tournament-button btn"
      onClick={(e) => joinTournament(e)} 
      to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
      Join Tournament
    </Link> 
    }
  }

  const logTask = (e) => {
    let task = {
      task_id: e.currentTarget.parentNode.getAttribute("myKey"),
      user_id: localStorage.getItem("myId")
    }

    fetch('http://localhost:3000/completedtasks/log', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const calculateUserPoints = (myUser, currentTournament) => {
    
    let total = 0;
    users.map((user) => {
      if (myUser.id == user.id) {
        user.tasks.map((task) => {
          if (task.tournament_id == currentTournament.id) {
            total += task.points
          }
        })
      }
    })
    return total;
  }

  const leaveTournament = () => {
    let participant = {
      user_id: localStorage.getItem("myId"),
      tournament_id: tournament.id
    }

    fetch('http://localhost:3000/competitions/delete', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(participant)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const joinTournament = (e) => {
    let participant = {
      user_id: localStorage.getItem("myId"),
      tournament_id: JSON.parse(localStorage.getItem("showTournament")).id
    }
    fetch('http://localhost:3000/competitions/associate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(participant)
    })
    .then(res => res.json())
    .then(competition => {
      console.log(competition)
    })
  }

  const listUsers = () => {
    for (const currentTournament of tournaments) {
      if (tournament.id == currentTournament.id) {
        return currentTournament.users.map((user) => {
          // debugger
          return (
          <div>
            <p className="showtournament-user" key={user.id}>{user.username}</p>
            <p className="showtournament-task-points"> - {calculateUserPoints(user, currentTournament)} points</p>
          </div>
          )
        })
      }
    }
  }

  const listTasks = () => {
    for (const currentTournament of tournaments) {
      try {
        if (tournament.id == currentTournament.id) {
          return currentTournament.tasks.map((task) => {
            return (
              <div mykey={task.id} key={task.id}>
                <p class="showtournament-task">{task.name}</p>
                <a className="log-task-link" onClick={(e) => logTask(e)}>Log Task</a> 
                <p className="showtournament-task-points">{task.points} points</p>
              </div>
            )
          })
        }
      } catch(err) {
        console.log(err)
        return <p>There are no tasks yet created for this tournament.</p>
      }
    }
  }
  

    return(
      <div>
        <h1>{tournament.name}</h1>
        <h3 class="showtournament-description">{tournament.description}</h3>
        <div className="showtournament-user-container">
          <h4>Members of this tournament:</h4>
          <ul>
            {listUsers()}
          </ul>
          {displayJoinButton()}
        </div>
        <div className="showtournament-task-container">
          <h4>Tasks for points:</h4>
          <ul>
            {listTasks()}
          </ul>
          <Link 
            className="tournament-button btn"
            to={`/tasks/new`}>
            Create Task
          </Link> 
        </div>
      </div>
    )


}


export default ShowTournament;
