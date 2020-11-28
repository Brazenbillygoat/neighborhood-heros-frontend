
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTournament } from '../actions/tournaments';
import { Link } from 'react-router-dom';


class TournamentContainer extends Component {
  

  joinTournament = (e) => {
    let participant = {
      user_id: localStorage.getItem("myId"),
      tournament_id: e.currentTarget.parentNode.getAttribute("myKey")
    }
    fetch('http://localhost:3000/competitions/associate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(participant)
    })
    .then(res => res.json())
    .then(competition => {
      console.log(competition)
    })
  }

  createTournamentList = () => {
    return this.props.tournaments.map((tournament) => {
      return (
        <div className="tournament-list-item" key={tournament.id} myKey={tournament.id}>
          <h4>{tournament.name}</h4>
          <p>{tournament.description}</p>
          <button className="tournament-button btn" onClick={(e) => this.joinTournament(e)}>Join Tournament</button> 
          <Link className="tournament-button btn" onClick={() => this.props.showTournament(tournament)} to={`/tournament/${tournament.id}`}>View Details</Link>
        </div>
      )
    })
  }
  

  render() {
    return(
      <div className="tournaments-container">
        
        {this.createTournamentList()}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments,
    selectedTournament: state.selectedTournament
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showTournament: showTournament
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentContainer);
