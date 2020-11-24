export const getTournaments = (tournaments) => {
  return {
    type: 'GETTOURNAMENTS',
    payload: tournaments
  }
}