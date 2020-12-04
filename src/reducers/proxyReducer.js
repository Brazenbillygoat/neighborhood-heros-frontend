
export default function (state = { proxy: 0}, action) {
  switch(action.type) {
    case 'PROXYUPDATE':
      let myState = {proxy: action.payload};
      return myState;
    default:
      return state;
  }
}
