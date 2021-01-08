
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { showUser } from '../actions/showUser';
import { addFriend } from '../actions/users';
import { bindActionCreators } from 'redux';


class UserContainer extends Component {
  baseUrl = "http://localhost:3000";
  // baseUrl = "https://neighborhood-heroes-backend.herokuapp.com";

  beFriend = (userId) => {
    let friends = {
      follower_id: JSON.parse(localStorage.getItem("myId")).id,
      followed_id: userId
    };
    //dispatch an action to update the state
    this.props.addFriend(friends)
    fetch(`${this.baseUrl}/relationship/friend`, {
      method: "POST",
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

  unFriend = (userId) => {
    let notFriends = {
      followed_id: JSON.parse(localStorage.getItem("myId")).id,
      follower_id: userId
    };
    
    fetch(`${this.baseUrl}/relationship/unfriend`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(notFriends)
    })
  }

  showAddOrRemoveFriendButton = (user) => {
    const sessionUser = JSON.parse(localStorage.getItem("myId"));
    let isFriend = false;

    sessionUser.followers.forEach((friend) => {
      if (friend.followed_id === user.id || friend.follower_id === user.id) {
        return isFriend = true;
      };
    });
    // sessionUser.followed.forEach((friend) => {
    //   if (friend.followed_id === user.id || friend.follower_id === user.id) {
    //     return isFriend = true;
    //   };
    // });
    
    if (isFriend) {
      return <button onClick={(e) => this.unFriend(user.id)}>Remove Friend</button>
    } else {
      return <button onClick={(e) => this.beFriend(user.id)}>Add Friend</button>
    }
  }

  tournamentsForUser = () => {

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
              <ul>
                <li>

                </li>
              </ul>
            </div>
          </div>
          {this.showAddOrRemoveFriendButton(user)}
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
    showUser: showUser,
    addFriend: addFriend
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
