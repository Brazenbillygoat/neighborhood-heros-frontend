import { useSelector, useDispatch } from 'react-redux';



const ShowTournament = () => {


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

  // const listUsers = () => {
  //   let users = useSelector(state => state.tournaments.users)
    
  //   // return users.map(user) {
  //   //   return <li>{user.name}</li>
  //   // }
  // }

  // const listTasks = () => {
  //   let tasks = useSelector(state => state.tournaments.tasks)

  // }

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
