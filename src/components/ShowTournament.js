import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { proxyUpdate } from '../actions/proxy';
import { showTournament } from '../actions/tournaments';
import { tournamentMembers } from '../actions/tournamentMembers';
import { addPoints } from '../actions/myPoints';



const ShowTournament = () => {

  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const tournaments = useSelector(state => state.tournaments);
  const selectedTournament = useSelector(state => state.selectedTournament);
  const tournament = JSON.parse(localStorage.getItem("showTournament"));
  const myTournamentMembers = useSelector(state => state.myTournamentMembers);
  const myPoints = useSelector(state => state.myPoints);
  
  
  const userMembers = () => {
    let participants = [];

    for (let user of selectedTournament.users) {
      participants.push(user)
    }

    // for (let user of users) {
    //   if (user.id != localStorage.getItem("myId")) {
    //     participants.push(user)
    //   }
    // }
    return participants;
  }
  
  const displayJoinButton = () => {
    let userIds = [];
    
    for (let user of myTournamentMembers) {
      userIds.push(user.id)
    }

      let leaveOrJoin = 1;
      if (userIds.includes(JSON.parse(localStorage.getItem("myId")))) {
        leaveOrJoin =  1;
      } else {
        leaveOrJoin = 0;
      }

    if (leaveOrJoin) {
      return <Link 
          className="tournament-button btn"
          onClick={(e) => leaveTournament(e)} 
          to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
          Leave Tournament
        </Link> 
    }
    return <Link 
          className="tournament-button btn"
          onClick={(e) => joinTournament(e)} 
          to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
          Join Tournament
        </Link> 
  }

  const showDeleteLink = (task) => {
    if (task.creator_id == localStorage.getItem("myId")) {
      return <a className="log-task-link" onClick={(e) => deleteTask(e)}>delete</a>
    }
  }

  const showCreateTaskButton = () => {
    if (selectedTournament.creator_id == localStorage.getItem("myId")) {
      return (
      <Link 
        className="tournament-button btn"
        to={`/tasks/new`}>
        Create Task
      </Link> 
      )
    }
  }

  const deleteTask = (e) => {
    let task = {
      task_id: e.currentTarget.parentNode.getAttribute("myKey"),
    }

    fetch('http://localhost:3000/tasks/delete', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((err) => console.log(err))
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
    .then(data => {
      
      dispatch(addPoints(5))
    })
  }

  const calculateUserPoints = (thisUser, currentTournament) => {
    
    let total = 0;
    users.map((user) => {
      user.tasks.map((task) => {
        if (task.tournament_id == currentTournament.id) {
          total += task.points
        }
      })
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
    .then(() => {
    })
    .catch((err) => {
      console.log(err)
    })

    dispatch(tournamentMembers(userMembers().filter((user) => user.id != localStorage.getItem("myId"))))

  }

  const joinTournament = (e) => {
    let participant = {
      user_id: JSON.parse(localStorage.getItem("myId")).id,
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
          dispatch(
            tournamentMembers([...userMembers(),
            JSON.parse(localStorage.getItem("myId"))])
          )
    })
  }

  const listUsers = () => {
    return tournaments.map((tournament) => {
      if (tournament.id == selectedTournament.id) {
        return tournament.users.map((user) => {
          return (
            <div className="showtournament-ul">
              <p className="showtournament-user" key={user.id}>{user.username}</p>
              <p className="showtournament-task-points">- {calculateUserPoints(user, selectedTournament)} points</p>
            </div>
          )
        })
      }
    })
  }

  const listTasks = () => {
    for (const currentTournament of tournaments) {
      try {
        if (tournament.id == currentTournament.id) {
          return currentTournament.tasks.map((task) => {
            return (
              <div  className="showtournament-ul" mykey={task.id} key={task.id}>
                <p class="showtournament-task">{task.name}</p>
                <a className="log-task-link" onClick={(e) => logTask(e)}>Log Task</a> 
                <p className="showtournament-task-points">{task.points} points</p>
                {showDeleteLink(task)} 
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
      <div className="showtournament-div">
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
          {showCreateTaskButton()}
        </div>
      </div>
    )


}


export default ShowTournament;
