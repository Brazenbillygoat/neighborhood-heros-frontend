export const showUser = (user) => {
  console.log("You clicked ", user.username)
  return {
    type: 'SHOWUSER',
    payload: user
  }
}