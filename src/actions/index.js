
export const increment = (num) => {
  return {
    type: 'INCREMENT',
    payload: num
  };
};

export const decrement = () => {
  return {
    type: 'DECREMENT'
  };
};

export const getUsers = (users) => {
  return {
    type: 'GETUSERS',
    payload: users
  }
}