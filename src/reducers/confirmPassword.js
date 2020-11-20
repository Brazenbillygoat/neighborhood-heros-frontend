export default function (state = "", action) {
  switch(action.type) {
    case 'UPDATECONFIRMPASSWORD':
      return action.payload;
    default:
      return state
  }
}