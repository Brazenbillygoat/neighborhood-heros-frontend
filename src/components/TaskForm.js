
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { taskName, taskDescription, taskPoints } from '../actions/taskForm';
import { showTournament, getTournaments, pastTournaments } from '../actions/tournaments';



function TaskForm() {
  const stateTournaments = useSelector(state => state.tournaments);
  const newTaskName = useSelector(state => state.newTask.name);
  const newTaskDescription = useSelector(state => state.newTask.description);
  const newTaskPoints = useSelector(state => state.newTask.points);
  const selectedTournament = useSelector(state => state.selectedTournament)

  const dispatch = useDispatch();


  const baseUrl = "http://localhost:3000";
  const baseUrl = "https://neighborhood-heroes-backend.herokuapp.com";

  const fetchTournaments = () => {
    fetch(`${baseUrl}/tournaments`)
      .then(res => res.json())
      .then(tournaments => {
        let endedTournaments = [];
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
          } else {
            // endedTournaments.push(tournament)
          }
        })
        dispatch(getTournaments(activeTournaments));
        dispatch(pastTournaments(endedTournaments));
      })
  }

  //Need to implement thunk in the method below next refactor
  const createTask = (selectedTournament) => {
    let newTask ={
      name: newTaskName,
      description: newTaskDescription,
      points: newTaskPoints,
      creator_id: JSON.parse(localStorage.getItem("myId")).id,
      tournament_id: JSON.parse(localStorage.getItem("showTournament")).id
    }

    const findSelectedTournament = (tournament) => {
      if (tournament.id === selectedTournament.id) {
        return tournament
      }
    }
    let updatedTournament = stateTournaments.find((tournament) => findSelectedTournament(tournament));
    updatedTournament.tasks.push(newTask);

    dispatch(showTournament(updatedTournament));
    localStorage.setItem("taskCreated", true);

    fetch(`${baseUrl}/tasks/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(task => {
      console.log(task)
      dispatch(taskName(""));
      dispatch(taskDescription(""));
      dispatch(taskPoints(5));
      fetchTournaments()
    })
    .catch((error) => {
      <Redirect to='/tournaments' />
      console.log(error)
    })
  }
  

  return (

    <div className="create-task-form">
    <h1>Add new task to tournament</h1>
    <form onSubmit={createTask}>
      <h2 className="taskform-header">{}</h2>
      <label>
        <h4>Task Name:</h4>
        <input className="login-input"
                type="text" 
                value={newTaskName}
                onChange={(e) => dispatch(taskName(e.target.value))}
        />
      </label>
      <br/>
      <label>
        <h4>Task Description:</h4>
        <textarea className="login-input"
                type="textarea" 
                value={newTaskDescription}
                onChange={(e) => dispatch(taskDescription(e.target.value))} 
        />
      </label>
      <br/>
      <label>
        <h4>Task Points:</h4>
        <input className="login-input"
                type="number" 
                step="5"
                value={parseInt(newTaskPoints)}
                onChange={(e) => dispatch(taskPoints(e.target.value))} 
        />
      </label>
      <br/>
      <Link to={`/tournament/${selectedTournament.id}`} onClick={() => createTask(selectedTournament)}><input className="btn btn-primary" type="submit" value="Create" /> </Link>
    </form>
      <Link className="btn btn-primary task-back-button" to={`/tournament/${selectedTournament.id}`}>Back</Link>


    </div>

  )
}

export default TaskForm;
