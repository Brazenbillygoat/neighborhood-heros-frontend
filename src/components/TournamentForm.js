import { useSelector, useDispatch } from 'react-redux';
import { tournamentName,
         tournamentDescription, 
         tournamentStartDate, 
         tournamentEndDate
        } from '../actions/tournamentForm';


const TournamentForm = () => {

  const newTournamentName = useSelector(state => state.newTournament.name);
  const newTournamentDescription = useSelector(state => state.newTournament.description);
  const newTournamentStartDate = useSelector(state => state.newTournament.startDate);
  const newTournamentEndDate = useSelector(state => state.newTournament.endDate);
  const dispatch = useDispatch();


  const datesChronologicallySound = () => {
    if (newTournamentStartDate !== "" && newTournamentEndDate !== "") {
      // debugger
      if (newTournamentStartDate > newTournamentEndDate) {
        document.getElementById("create-tournament-button").setAttribute("disabled", "true");
        return <p className="newtournament-date-validation">End date must be after the start date.</p>
      } else if (newTournamentEndDate < new Date().toJSON().slice(0,10)) {
        document.getElementById("create-tournament-button").setAttribute("disabled", "true");
        return <p className="newtournament-date-validation">End date must be after today's date.</p>
      } else if (newTournamentStartDate === newTournamentEndDate) {
        document.getElementById("create-tournament-button").setAttribute("disabled", "true");
        return <p className="newtournament-date-validation">Tournament must be at least 24 hours.</p>
      }
      document.getElementById("create-tournament-button").removeAttribute("disabled");
    }  
  }

  const createTournament = (e) => {
    e.preventDefault();
    let tournament = {
      name: newTournamentName,
      description: newTournamentDescription,
      startDate: newTournamentStartDate,
      endDate: newTournamentEndDate,
      creatorId: JSON.parse(localStorage.getItem("myId")).id
    }
    fetch('http://localhost:3000/tournaments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tournament)
    })
    .then(res => res.json())
    .then(data => {
      window.location.href="http://localhost:3001/tournaments";
      window.location.reload();
    })
  }

  return (
    <div className="new-tournament-form">

      <form onSubmit={createTournament}>
        <h2>New Tournament</h2>
        <label>
          <h4>Name:</h4>
          <input 
            className="tournament-form-input"
            type="text"
            value={newTournamentName}
            onChange={(e) => dispatch(tournamentName(e.target.value))}
            required
          />
          <h4>Description:</h4>
          <textarea 
            className="tournament-form-input"
            type="textarea" 
            value={newTournamentDescription}
            onChange={(e) => dispatch(tournamentDescription(e.target.value))}
          />
          <h4>Start Date:</h4>
          <input 
            className="tournament-form-input"
            type="date" 
            value={newTournamentStartDate}
            onChange={(e) => dispatch(tournamentStartDate(e.target.value))}
            required
            />
          <h4>End Date:</h4>
          {datesChronologicallySound()}
          <input 
            className="tournament-form-input"
            type="date" 
            value={newTournamentEndDate}
            onChange={(e) => dispatch(tournamentEndDate(e.target.value))}
            required
            />
        </label>
        <br/>
        <input id="create-tournament-button" className="btn btn-primary" type="submit" value="Create"/>
      </form>

    </div>
  )
}


export default TournamentForm;