

export default function (state = {}, action) {
  switch(action.type) {
    case 'SHOWTOURNAMENT':
      // localStorage.setItem("showTournament", Json.stringify(action.payload))
      state = action.payload;
      return state;
    // case 'UPDATETOURNAMENTNAME':
    //   state.name = action.payload;
    //   return state;
    // case 'UPDATETOURNAMENTDESCRIPTION':
    //   return state.description = { ...state, description: action.payload };
    // case 'UPDATETOURNAMENTSTARTDATE':
    //   return state.startDate = { ...state, startDate: action.payload };
    // case 'UPDATETOURNAMENTENDDATE':
    //   return state.endDate = { ...state, endDate: action.payload };
    default:
      return state
  }
}