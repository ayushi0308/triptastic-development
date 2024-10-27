const defaultState = {
  token: localStorage.getItem("access_token") || null,
  
};

// Action
// {
//   type: "AUTH_TOKEN",
//   payload: { token }
// }

export default (state = defaultState, action) => {
  switch (action.type) {
    
    case "AUTH_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
