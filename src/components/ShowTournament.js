import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showTournament, getTournaments } from '../actions/tournaments';
import { addPoints } from '../actions/myPoints';


const ShowTournament = () => {

  const dispatch = useDispatch();

  const selectedTournament = useSelector(state => state.selectedTournament);
  const tournament = JSON.parse(localStorage.getItem("showTournament"));
  const myPoints = useSelector(state => state.myPoints);

  const baseUrl = "http://localhost:3000";
  // const baseUrl = "https://neighborhood-heroes-backend.herokuapp.com";
  
  const fetchTournaments = () => {
    fetch(`${baseUrl}/tournaments`)
      .then(res => res.json())
      .then(tournaments => {
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
          }
        })
        dispatch(getTournaments(activeTournaments));
      })
  }

  const checkUserIsMember = () => {
    let memberIds = []
    for (let member of selectedTournament.users) {
      memberIds.push(member.id)
    }

    return memberIds.includes(JSON.parse(localStorage.getItem("myId")).id)
  }
  
  const displayJoinButton = () => {

    if (checkUserIsMember()) {
      return <Link 
          className="tournament-button btn"
          onClick={leaveTournament} 
          to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
          Leave Tournament
        </Link> 
    }
    return <Link 
          className="tournament-button btn"
          onClick={joinTournament} 
          to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
          Join Tournament
        </Link> 
  }

  const showDeleteLink = (task) => {
    if (task.creator_id === JSON.parse(localStorage.getItem("myId")).id) {
      return <Link 
          className="log-task-link" 
          onClick={deleteTask}
          to={`/tournament/${JSON.parse(localStorage.getItem("showTournament")).id}`}>
          delete
        </Link>
    }
  }

  const showCreateTaskButton = () => {
    if (selectedTournament.creator_id === JSON.parse(localStorage.getItem("myId")).id) {
      return (
      <Link 
        className="tournament-button btn"
        onClick={() => fetchTournaments()}
        to={`/tasks/new`}>
        Create Task
      </Link> 
      )
    }
  }

  const deleteTask = (e) => {
    let taskId = e.currentTarget.parentNode.getAttribute("myKey");
    let task = {
      task_id: taskId
    }
    selectedTournament.tasks = selectedTournament.tasks.filter((task) => task.id !== taskId);
    

    fetch(`${baseUrl}/tasks/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
    .then(() => {
      dispatch(showTournament(selectedTournament));
    })
  }

  const logTask = (e) => {
    let taskToLog = selectedTournament.tasks.find((task) => {
      return task.id === parseInt(e.currentTarget.parentNode.getAttribute("myKey"))
    })

    //the code below is for updating a users profile when they log a task
    //but I have yet to build that feature

    selectedTournament.users.forEach((user) => {
      if (user.id === JSON.parse(localStorage.getItem("myId")).id) {
        return user.tasks.push(taskToLog)
      }
    })

    let task = {
      task_name: e.currentTarget.parentNode.children[0].innerText,
      task_id: e.currentTarget.parentNode.getAttribute("myKey"),
      user_id: JSON.parse(localStorage.getItem("myId")).id
    }
    let updatedUser = JSON.parse(localStorage.getItem("myId"))
    updatedUser.tasks.push(taskToLog)
    localStorage.setItem("myId", JSON.stringify(updatedUser))
    // userToAttribute.tasks.push(taskToLog)

    fetch(`${baseUrl}/completedtasks/log`, {
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

  const calculateUserPoints = (userId) => {
    let total = 0;
      selectedTournament.users.forEach((user) => {
        if (user.id === userId) {
          user.tasks.forEach((task) => {
            if (task.tournament_id === selectedTournament.id) {
              total += task.points
            }
          })
        }
      })
    return total;
  }

  const leaveTournament = () => {
    
    let participant = {
      user_id: JSON.parse(localStorage.getItem("myId")).id,
      tournament_id: tournament.id
    }

    if (checkUserIsMember()) {
      let indexToDelete;
      selectedTournament.users.forEach((user, i) => {
        if (user.id === JSON.parse(localStorage.getItem("myId")).id) {
          indexToDelete = i
        }
      })
      selectedTournament.users.splice(indexToDelete, 1)
      let tasksRemoved = JSON.parse(localStorage.getItem("myId")).tasks.filter((task) => {
        return task.tournament_id !== selectedTournament.id
      })
      let updatedUser = JSON.parse(localStorage.getItem("myId"))
      updatedUser.tasks = tasksRemoved
      localStorage.setItem("myId", JSON.stringify(updatedUser))
    }

    fetch(`${baseUrl}/competitions/delete`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(participant)
    })
    .then(() => {
      dispatch(showTournament(selectedTournament));
    })
    .catch((err) => {
      console.log(err)
    })

    // dispatch(tournamentMembers(userMembers().filter((user) => user.id != JSON.parse(localStorage.getItem("myId")).id)))

  }

  const joinTournament = () => {
    let participant = {
      user_id: JSON.parse(localStorage.getItem("myId")).id,
      tournament_id: JSON.parse(localStorage.getItem("showTournament")).id
    }

    if (!checkUserIsMember()) {
      selectedTournament.users.push(JSON.parse(localStorage.getItem("myId")))
    }
    
    fetch(`${baseUrl}/competitions/associate`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(participant)
    })
    .then(() => {
      dispatch(showTournament(selectedTournament));
    })
  }

  const listUsers = () => {
    return selectedTournament.users.map((user) => {
      return (
        <div className="showtournament-ul">
          <p className="showtournament-user" key={user.id}>{user.username}</p>
          <p className="showtournament-task-points">- {calculateUserPoints(user.id)} points</p>
        </div>
      )
    })
  }
  
  const listTasks = () => {
      try {
        return selectedTournament.tasks.map((task) => {
          return (
            <div  className="showtournament-ul" mykey={task.id} key={task.id}>
              <p class="showtournament-task">{task.name}</p>
              <button className="log-task-link" onClick={(e) => logTask(e)}>Log Task</button> 
              <p className="showtournament-task-points">{task.points} points</p>
              {showDeleteLink(task)} 
            </div>
          )
        })
      } catch(err) {
        console.log(err)
        return <p>There are no tasks yet created for this tournament.</p>
      }
  }
  
    return(
      <div className="showtournament-div">
        <h1>{tournament.name}</h1>
        <h3 class="showtournament-description">{tournament.description}</h3>
        <div className="showtournament-users-and-tasks">
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
      </div>
    )


}


export default ShowTournament;
