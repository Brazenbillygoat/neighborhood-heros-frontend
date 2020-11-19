
  let users;
  
  const getUsers = async () => { 
    let response = await fetch('http://localhost:3000/users')
  let dbUsers = await response.json()
  users = dbUsers
}

getUsers();

const usersReducer = (state = [], action) => {
  switch(action.type){
    case 'GETUSERS':
      return users
    default:
      return state;
  };
};

export default usersReducer;