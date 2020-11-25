import { useSelector, useDispatch } from 'react-redux';
import { tournamentName,
         tournamentDescription, 
         tournamentStartDate, 
         tournamentEndDate
        } from '../actions/tournamentForm';


const TournamentForm = () => {

  const newTournamentName = useSelector(state => state.tournament.name);
  const newTournamentDescription = useSelector(state => state.tournament.description);
  const newTournamentStartDate = useSelector(state => state.tournament.startDate);
  const newTournamentEndDate = useSelector(state => state.tournament.endDate);
  const dispatch = useDispatch();


  const createTournament = (e) => {
    e.preventDefault();
    let tournament = {
      name: newTournamentName,
      description: newTournamentDescription,
      startDate: newTournamentStartDate,
      endDate: newTournamentEndDate
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
      window.location.reload();
    })
  }

  return (
    <div>

      <form onSubmit={createTournament}>
        <h2>New Tournament</h2>
        <label>
          <h4>Name:</h4>
          <input 
            className="tournament-form-input"
            type="text"
            value={newTournamentName}
            onChange={(e) => dispatch(tournamentName(e.target.value))}
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
            type="datetime-local" 
            value={newTournamentStartDate}
            onChange={(e) => dispatch(tournamentStartDate(e.target.value))}
            />
          <h4>End Date:</h4>
          <input 
            className="tournament-form-input"
            type="datetime-local" 
            value={newTournamentEndDate}
            onChange={(e) => dispatch(tournamentEndDate(e.target.value))}
            />
        </label>
        <br/>
        <input className="btn btn-primary" type="submit" value="Create"/>
      </form>

    </div>
  )
}


export default TournamentForm;