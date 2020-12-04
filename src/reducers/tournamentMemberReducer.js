

export default function (state = [], action) {
  switch(action.type) {
    case 'GETMEMBERS':
      state = action.payload;
      return state;

    default:
      return state
  }
}
