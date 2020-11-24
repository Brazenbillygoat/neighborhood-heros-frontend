
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { tournamentStartDate } from '../actions/tournamentForm';


class TournamentContainer extends Component {

  createTournamentList() {
    return this.props.tournaments.map((tournament) => {
      return (
        <p>{tournament.name}</p>
      )
    })
  }
  

  render() {
    return(
      <div>
        {this.createTournamentList()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
    
//   })
// }

export default connect(mapStateToProps)(TournamentContainer);
