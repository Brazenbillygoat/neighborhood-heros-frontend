
export default function (state = "", action) {
  switch(action.type) {
    case 'UPDATEUSERNAME':
      return action.payload;
    default:
      return state;
  }
}