const tournamentName = (value) => {
  return {
    type: 'UPDATETOURNAMENTNAME',
    payload: value
  }
}

const tournamentDescription = (value) => {
  return {
    type: 'UPDATETOURNAMENTDESCRIPTION',
    payload: value
  }
}

const tournamentStartDate = (value) => {
  return {
    type: 'UPDATETOURNAMENTSTARTDATE',
    payload: value
  }
}

const tournamentEndDate = (value) => {
  return {
    type: 'UPDATETOURNAMENTENDDATE',
    payload: value
  }
}


export { 
  tournamentName,
  tournamentDescription,
  tournamentStartDate,
  tournamentEndDate
}