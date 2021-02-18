import { useSelector } from 'react-redux';


export default function HomeContainer() {
  const pastTournaments = useSelector(state => state.pastTournaments);

  //need the points brought closer to top level of API
  const displayWinner = () => {
    return pastTournaments.map((tournament) => {
      let tournamentWinner = "";
      let winnerPoints = 0;
      tournament.users.forEach((user) => {
        let currentPoints = 0;
        user.tasks.forEach((task) => {
          currentPoints += task.points;
        })
        if (currentPoints > winnerPoints) {
          winnerPoints = currentPoints;
          tournamentWinner = user.username;
        }
      })
      return (
        <>
          <p>The "{tournament.name}" tournament was won by {tournamentWinner}!</p>
        </>
      )
    })
  }

  return (
    <div className="home-body-div">
      <h1>Neighborhood Heroes</h1>
      <p>_____________________________________________________________________</p>
      {/* <p className="winner-paragraph">The "Keep the coffee coming" tournament was won by Hyrum!</p> */}
      {displayWinner()}
      <p>_____________________________________________________________________</p>
      <h3 className="home-paragraph">Impactful communities add value when they support members, provide a sense of camaraderie, make strategic connections, and act as a source of advice that members can apply to their own lives. Community members often share a passion for personal improvement and continued learning.</h3>
      <h2>Building together from afar.</h2>

      
    </div>
  )
}

