
import { useSelector, useDispatch } from 'react-redux';
import { taskName, taskDescription, taskPoints } from '../actions/taskForm';


function TaskForm() {
  const newTaskName = useSelector(state => state.newTask.name);
  const newTaskDescription = useSelector(state => state.newTask.description);
  const newTaskPoints = useSelector(state => state.newTask.points);
  const curentTournament = useSelector(state => state.selectedTournament)

  const dispatch = useDispatch();


  const createTask = (e) => {
    e.preventDefault();
    let newTask ={
      name: newTaskName,
      description: newTaskDescription,
      points: newTaskPoints,
      tournament_id: curentTournament.id
    }

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
  }
  

  return (

    <div>
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
        <input className="login-input"
                type="text" 
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
      <input className="btn btn-primary" type="submit" value="Create" />
    </form>


    </div>

  )
}

export default TaskForm;
