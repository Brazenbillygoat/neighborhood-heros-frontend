
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { showUser } from '../actions/showUser';
import { bindActionCreators } from 'redux';


class UserContainer extends Component {
  
  createUserList() {
    return this.props.users.map((user) => {
      return(
        <p key={user.id} onClick={() => this.props.showUser(user)}>{user.username}</p>
      )
        // <button>Add Friend</button>
    })
  }

  render() {
    return (
      <div>
             {this.createUserList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
