
//   const users = []

const getUsers = () => { 
  // return fetch('http://localhost:3000/users')
  // .then(res => res.json())
  // .then(users => {
  //   console.log(users)
  //   return users
  // })
  return "test"
}

// getUsers();

const usersReducer = (state = [], action) => {
  switch(action.type){
    case 'GETUSERS':
      return [...state, getUsers()];
      // fetch('http://localhost:3000/users')
      // .then(res => res.json())
      // .then(users => {
      //   console.log(users)
      //   debugger
      //   state = [...state, users]
      // })
      return state;
    default:
      return state;
  };
};

export default usersReducer;