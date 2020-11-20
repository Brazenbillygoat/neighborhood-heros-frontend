const username = (value) => {
  return {
    type: 'UPDATEUSERNAME',
    payload: value
  }
}

const password = (value) => {
  return {
    type: 'UPDATEPASSWORD',
    payload: value
  }
}

const confirmPassword = (value) => {
  return {
    type: 'UPDATECONFIRMPASSWORD',
    payload: value
  }
}

const signupOrLogin =() => {
  return {
    type: 'SIGNUPORLOGIN'
  }
}


export { username, password, confirmPassword, signupOrLogin };