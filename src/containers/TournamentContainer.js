
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTournament } from '../actions/tournaments';
import { Link } from 'react-router-dom';


class TournamentContainer extends Component {
  
  

  joinTournament = (e) => {
    let participant = {
      user_id: JSON.parse(localStorage.getItem("myId")).id,
      tournament_id: e.currentTarget.parentNode.getAttribute("id")
    }

    fetch('http://localhost:3000/competitions/associate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(participant)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error == 1) {
        document.getElementsByClassName("tournament-list-error")[0].removeAttribute("hidden");
        setTimeout(() => {
          document.getElementsByClassName("tournament-list-error")[0].setAttribute("hidden", "true");
        }, 3000);
      } else {
        document.getElementById(`${data.tournament_id}`).children[2].setAttribute("disabled", "true");
        this.props.tournaments.forEach(tournament => {
          if (tournament.id == data.tournament_id) {
            tournament.users.push(JSON.parse(localStorage.getItem("myId")))
          }
        });
      }
    })
  }

  joinButtonDisabled = (tournament) => {
    if (tournament.users.includes(JSON.parse(localStorage.getItem("myId")))) {
      return <button className="tournament-button btn join-button" disabled="true" onClick={(e) => this.joinTournament(e)}>Join Tournament</button>
    } else {
      return <button className="tournament-button btn join-button" onClick={(e) => this.joinTournament(e)}>Join Tournament</button>
    }
  }

  createTournamentList = () => {
    return this.props.tournaments.map((tournament) => {
      return (
        <div className="tournament-list-item" key={tournament.id} id={tournament.id}>
          <h4>{tournament.name}</h4>
          <p>{tournament.description}</p>
          {this.joinButtonDisabled(tournament)}
          {/* <button className="tournament-button btn join-button" onClick={(e) => this.joinTournament(e)}>Join Tournament</button>  */}
          <Link className="tournament-button btn" onClick={() => this.props.showTournament(tournament)} to={`/tournament/${tournament.id}`}>View Details</Link>
        </div>
      )
    })
  }
  
  
  render() {
    localStorage.setItem("taskCreated", false)
    return(
      <div className="tournaments-container">
      <p className="tournament-list-error" hidden>You've already joined this tournament.</p>
        
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
