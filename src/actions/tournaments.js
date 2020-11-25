import { tournamentStartDate } from "./tournamentForm"

export const getTournaments = (tournaments) => {
  return {
    type: 'GETTOURNAMENTS',
    payload: tournaments
  }
}

export const showTournament = (tournament) => {
  return {
    type: 'SHOWTOURNAMENT',
    payload: tournament
  }
}

