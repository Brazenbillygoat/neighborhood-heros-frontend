

export default function updatePoints(state = 0, action) {
  switch(action.type) {
    case 'UPDATEPOINTS':
      return state = state + action.payload;
    default:
      return state;
  }
}
