

export default function (state = 0, action) {
  switch(action.type) {
    case 'UPDATEPOINTS':
      state = state += action.payload;
      return state;
    default:
      return state;
  }
}
