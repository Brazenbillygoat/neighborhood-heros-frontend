
export default function (state = true, action) {
  switch(action.type) {
    case 'SIGNUPORLOGIN':
      return !state
    default:
      return state
  }
}
