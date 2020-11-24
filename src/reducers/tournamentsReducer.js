
export default function (state = [], action) {
  switch(action.type) {
    case 'GETTOURNAMENTS':
      return action.payload;
    default:
      return state;
  }
}


