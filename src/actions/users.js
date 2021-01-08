
const addFriend = (users) => {
  return {
    type: 'ADDFRIEND',
    payload: users
  }
}


export {
  addFriend
};