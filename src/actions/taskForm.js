
const taskName = (value) => {
  return {
    type: 'UPDATETASKNAME',
    payload: value
  }
}

const taskDescription = (value) => {
  return {
    type: 'UPDATETASKDESCRIPTION',
    payload: value
  }
}

const taskPoints = (value) => {
  return {
    type: 'UPDATETASKPOINTS',
    payload: value
  }
}

export { taskName, taskDescription, taskPoints };
