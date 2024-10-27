const defaultState = {
  airports: [],
  flights: [],
  bookings: [],
  refundStatus: [],
};
// Action
// {
//   type: "ENQUIRY",
//   payload: {}
// }

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_REFUND_STATUS":
      return { ...state, refundStatus: action.payload };
    case "SET_BOOKINGS":
      return { ...state, bookings: action.payload };
    case "SET_FLIGHT":
      return { ...state, flights: action.payload };
    case "SET_AIRPORTS":
      return { ...state, airports: action.payload };
    default:
      return state;
  }
};
