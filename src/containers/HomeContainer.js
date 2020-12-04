import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export default function HomeContainer() {
  const winners = useSelector(state => state.winners)
  

    // const quoteDisplay = () =>  {
    //   fetch('https://type.fit/api/quotes')
    //   .then(res => res.json())
    //   .then(quote => {
    //     console.log(quote[Math.ceil(Math.random() * 10)].text)
    //     return <h4>"{quote[Math.ceil(Math.random() * 10)].text}"</h4>
    //   })
    // }

    // const displayWinner = () => {
    //   for (let winner of winners) {
    //     return (
    //       <p></p>
    //       // <p>The "{winner.name}" tournament was won by {winner.leader.name}!</p>
    //     )
    //   }
    // }

    return (
      <div className="home-body-div">
        <h1>Neighborhood Heroes</h1>
        <p>_____________________________________________________________________</p>
        <p className="winner-paragraph">The "Keep the coffee coming" tournament was won by Hyrum!</p>
        <p>_____________________________________________________________________</p>
        <h3 className="home-paragraph">Impactful communities add value when they support members, provide a sense of camaraderie, make strategic connections, and act as a source of advice that members can apply to their own lives. Community members often share a passion for personal improvement and continued learning.</h3>
        <h2>Building together from afar.</h2>

        
      </div>
    )
}

