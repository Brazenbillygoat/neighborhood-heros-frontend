import { useSelector, useDispatch } from 'react-redux';



const ShowTournament = () => {

  const tournaments = useSelector(state => state.tournaments);
  const tournament = useSelector(state => state.selectedTournament);
  // const tasks = useSelector(state => state.tournaments.tasks);


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

  const listUsers = () => {
    for (const currentTournament of tournaments) {
      if (tournament.id == currentTournament.id) {

        return currentTournament.users
      }
    }
  }

  const listTasks = () => {
    for (const currentTournament of tournaments) {
      if (tournament.id == currentTournament.id) {
        return <p>{currentTournament.tasks}</p>
      }
    }
  }

    return(
      <div>
        <h1>Hello competitor!</h1>
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
