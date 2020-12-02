
export default function(state = [], action) {
  switch(action.type) {
    case 'PASTTOURNAMENTS':
      return action.payload;
    default:
      return state;
  }
}
