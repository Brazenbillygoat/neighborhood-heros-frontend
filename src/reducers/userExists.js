
export default function (state = false, action) {
  switch(action.type) {
    case 'SIGNUPORLOGIN':
      return !state
    default:
      return state
  }
}
