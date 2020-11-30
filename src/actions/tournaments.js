import { tournamentStartDate } from "./tournamentForm"

export const getTournaments = (tournaments) => {
  return {
    type: 'GETTOURNAMENTS',
    payload: tournaments
  }
}

export const showTournament = (tournament) => {
  localStorage.setItem("showTournament", JSON.stringify(tournament))
  return {
    type: 'SHOWTOURNAMENT',
    payload: tournament
  }
}

