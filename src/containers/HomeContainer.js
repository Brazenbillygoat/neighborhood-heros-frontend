import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showUser } from '../actions/showUser'

export class HomeContainer extends Component {

  createUserList() {
    return this.props.users.map((user) => {
      return(
        <p key={user.id} onClick={() => this.props.showUser(user)}>{user.username}</p>
      )
    })
  }

  render() {
    return (
      <div>
        {this.createUserList()}
        <h1>welcome Home</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showUser: showUser
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
