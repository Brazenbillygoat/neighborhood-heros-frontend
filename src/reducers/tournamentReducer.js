

export default function (state = {}, action) {
  switch(action.type) {
    case 'SHOWTOURNAMENT':
      state = action.payload;
      return state;

    default:
      return state
  }
}