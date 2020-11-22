
  let allUsers;

const getUsers = () => { 
  return fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(users => {
    console.log(users)
    allUsers = users;
  })
}

getUsers();

const usersReducer = (state = [], action) => {
  switch(action.type){
    case 'GETUSERS':
      return allUsers;
    default:
      return state;
  };
};

export default usersReducer;