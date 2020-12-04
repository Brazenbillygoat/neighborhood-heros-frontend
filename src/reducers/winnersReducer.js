


export default function (state = [], action) {
  switch(action.type) {
    case 'ADDWINNERS':
      return action.payload;
    default:
      return state;
  }
}
