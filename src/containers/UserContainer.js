
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { showUser } from '../actions/showUser';
import { bindActionCreators } from 'redux';


class UserContainer extends Component {
  baseUrl = "http://localhost:3000";
  baseUrl = "https://neighborhood-heroes-backend.herokuapp.com";

  beFriend = (e) => {
    let friends = {
      follower_id: localStorage.getItem("myId"),
      followed_id: e.currentTarget.parentNode.getAttribute("myKey")
    }
    fetch(`${baseUrl}/relationship/friend`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(friends)
    })
    .then(res => res.json())
    .then(friendship => {
      console.log(friendship)
    })
  }

  unfriend = () => {

  }

  showAddOrRemoveFriendButton = () => {

  }
  
  createUserList() {
    return this.props.users.map((user) => {
      return(
        <div className="user-card col-md-5 container">
          <div className="users-container row" key={user.id} myKey={user.id}>
            <div className="col-sm-6">
              <img src={user.profile_pic} className="user-list-profile-pic" />
              <p onClick={() => this.props.showUser(user)}>{user.username}</p>
            </div>
            <div className="col-sm-6">
              <h4> Tournaments Joined:</h4>
            </div>
          </div>
          <button onClick={(e) => this.beFriend(e)}>Add Friend</button>
        </div>
      )}
    )
  }

  render() {
    return (
      <div className="container">
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
