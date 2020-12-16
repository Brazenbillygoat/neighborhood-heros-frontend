
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { taskName, taskDescription, taskPoints } from '../actions/taskForm';
import { showTournament } from '../actions/tournaments';


function TaskForm() {
  const newTaskName = useSelector(state => state.newTask.name);
  const newTaskDescription = useSelector(state => state.newTask.description);
  const newTaskPoints = useSelector(state => state.newTask.points);
  const selectedTournament = useSelector(state => state.selectedTournament)

  const dispatch = useDispatch();

  const createTask = () => {
    let newTask ={
      name: newTaskName,
      description: newTaskDescription,
      points: newTaskPoints,
      creator_id: JSON.parse(localStorage.getItem("myId")).id,
      tournament_id: JSON.parse(localStorage.getItem("showTournament")).id
    }
    selectedTournament.tasks.push(newTask);
    localStorage.setItem("taskCreated", true)
    fetch('http://localhost:3000/tasks/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
    .then(res => res.json())
    .then(task => {
      console.log(task)
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
      <Link to={`/tournament/${selectedTournament.id}`} onClick={() => createTask()}><input className="btn btn-primary" type="submit" value="Create" /> </Link>
    </form>


    </div>

  )
}

export default TaskForm;
