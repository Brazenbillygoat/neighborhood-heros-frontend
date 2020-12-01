

const initializer = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
}

export default function(state = initializer, action) {
  switch(action.type) {
    case 'UPDATETOURNAMENTNAME':
      return state.name = { ...state, name: action.payload };
    case 'UPDATETOURNAMENTDESCRIPTION':
      return state.description = { ...state, description: action.payload };
    case 'UPDATETOURNAMENTSTARTDATE':
      return state.startDate = { ...state, startDate: action.payload };
    case 'UPDATETOURNAMENTENDDATE':
      return state.endDate = { ...state, endDate: action.payload };
    default:
      return state;
  }
}