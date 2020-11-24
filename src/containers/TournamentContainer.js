
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TournamentContainer extends Component {

  render() {
    return(

    )
  }

}

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    
  })
}

