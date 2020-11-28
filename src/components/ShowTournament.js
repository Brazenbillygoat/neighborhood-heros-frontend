import { useSelector, useDispatch } from 'react-redux';
import { showTournament } from '../actions/tournaments';



const ShowTournament = () => {

  const tournaments = useSelector(state => state.tournaments);
  const tournament = useSelector(state => state.selectedTournament);

  const dispatch = useDispatch();

  const tournamentId = parseInt(window.location.href.split("/").slice(-1).pop() - 0)



  // const joinTournament = (e) => {
  //   let participant = {
  //     user_id: localStorage.getItem("myId"),
  //     tournament_id: e.currentTarget.parentNode.getAttribute("myKey")
  //   }
  //   fetch('http://localhost:3000/competitions/associate', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(participant)
  //   })
  //   .then(res => res.json())
  //   .then(competition => {
  //     console.log(competition)
  //   })
  // }


  const getSelectedTournament = () => {
    debugger
    console.log(dispatch(showTournament(tournaments.find((tourney) => tourney.id == tournamentId))));
  }

  const listUsers = () => {
    for (const currentTournament of tournaments) {
      if (tournament.id == currentTournament.id) {
        return currentTournament.users.map((user) => {
          // debugger
          return <p key={user.id}>{user.username}</p>
        })
      }
    }
  }

  const listTasks = () => {
    for (const currentTournament of tournaments) {
      try {
        if (tournament.id == currentTournament.id) {
          currentTournament.tasks.map((task) => {
            return <p key={task.id}>{task.name}</p>
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
        {/* {getSelectedTournament()} */}
        <h1>{tournament.name}</h1>
        <ul>
          {listUsers()}
        </ul>
        <ul>
          {listTasks()}
        </ul>
      </div>
    )


}


export default ShowTournament;
