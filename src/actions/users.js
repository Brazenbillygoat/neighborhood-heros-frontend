
const addFriend = (users) => {
  return {
    type: 'ADDFRIEND',
    payload: users
  }
}

const removeFriend = (users) => {
  return {
    type: 'REMOVEFRIEND',
    payload: users
  }
}


export {
  addFriend,
  removeFriend
};