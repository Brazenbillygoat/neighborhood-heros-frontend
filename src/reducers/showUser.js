
export default function (state = null, action) {
  switch(action.type) {
    case 'SHOWUSER':
      return action.payload;
    default:
      return state;
  }
}
