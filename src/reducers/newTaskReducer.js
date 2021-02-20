
const initializer = {
  name: "",
  description: "",
  points: 5
}

export default function updateTask(state = initializer, action) {
  switch(action.type) {
    case 'UPDATETASKNAME':
      return state.name = { ...state, name: action.payload };
    case 'UPDATETASKDESCRIPTION':
      return state.description = { ...state, description: action.payload };
    case 'UPDATETASKPOINTS':
      return state = { ...state, points: parseInt(action.payload) };
    default:
      return state;
  }
}
