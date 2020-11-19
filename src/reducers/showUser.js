
export default function (state = null, action) {
  switch(action.type) {
    case "SHOWUSER":
      return action.payload;
      break;
  }
  return state;
}

