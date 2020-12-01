
const initializer = {
  name: "",
  description: "",
  points: 5
}

export default function (state= initializer, action) {
  switch(action.type) {
    case 'UPDATETASKNAME':
      return state.name = { ...state, name: action.payload };
    case 'UPDATETASKDESCRIPTION':
      return state.description = { ...state, description: action.payload };
    case 'UPDATETASKPOINTS':
      let newPoints = parseInt(action.payload)
      // debugger
      return state.points = { ...state, points: newPoints };
    default:
      return state;
  }
}
