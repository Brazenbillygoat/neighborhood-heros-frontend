
//   let allUsers;

// const getUsers = () => { 
//   return fetch('http://localhost:3000/users')
//   .then(res => res.json())
//   .then(users => {
//     allUsers = users;
//   })
// }

// getUsers();

const usersReducer = (state = [], action) => {
  switch(action.type){
    case 'GETUSERS':
      return action.payload;
    case 'ADDFRIEND':
      return action.payload;
    case 'REMOVEFRIEND':
      return action.payload;
    default:
      return state;
  };
};

export default usersReducer;