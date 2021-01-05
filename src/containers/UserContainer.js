
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { showUser } from '../actions/showUser';
import { bindActionCreators } from 'redux';


class UserContainer extends Component {

  beFriend = (e) => {
    let friends = {
      follower_id: localStorage.getItem("myId"),
      followed_id: e.currentTarget.parentNode.getAttribute("myKey")
    }
    fetch('http://localhost:3000/relationship/friend', {
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
        <div className="users-container" key={user.id} myKey={user.id}>
        <img src={user.profile_pic}/>
        <p onClick={() => this.props.showUser(user)}>{user.username}</p>
        <button onClick={(e) => this.beFriend(e)}>Add Friend</button>
        </div>
      )}
    )
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
