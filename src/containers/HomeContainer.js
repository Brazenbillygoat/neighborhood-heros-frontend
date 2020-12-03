import React, { Component } from 'react';


export default class HomeContainer extends Component {
  render() {

    // const quoteDisplay = () =>  {
    //   fetch('https://type.fit/api/quotes')
    //   .then(res => res.json())
    //   .then(quote => {
    //     console.log(quote[Math.ceil(Math.random() * 10)].text)
    //     return <h4>"{quote[Math.ceil(Math.random() * 10)].text}"</h4>
    //   })
    // }

    return (
      <div className="home-body-div">
        <h1>Neighbrhood Heros</h1>
        {/* {quoteDisplay()} */}
        <h3>Build</h3>

        
      </div>
    )
  }
}

