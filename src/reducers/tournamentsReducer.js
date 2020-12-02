
export default function (state = [], action) {
  switch(action.type) {
    case 'GETTOURNAMENTS':
      state = action.payload;
      return state;
    default:
      return state;
  }
}


