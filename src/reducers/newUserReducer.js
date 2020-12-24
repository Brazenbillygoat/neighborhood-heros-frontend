
const initializer = {
  username: "",
  password: "",
  confirmPassword: ""
};

export default function(state = initializer, action) {
  switch(action.type) {
    case 'UPDATEUSERNAME':
      return state = {...state, username: action.payload};
    case 'UPDATEPASSWORD':
      return state = {...state, password: action.payload};
    case 'UPDATECONFIRMPASSWORD':
      return state = {...state, confirmPassword: action.payload};
    default:
      return state;
  }
}
