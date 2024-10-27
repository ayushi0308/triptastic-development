import LocalApi from "./../apis/local";
import { handleServerError } from "./../helpers/error_helper";
import {
  AUTH_TOKEN,
  PERSONAL_INFO_DIALOG_OPEN,
  MENU_DRAWER_OPEN,
  SET_TABLE_SETTINGS,
  SET_SNACKBAR_SETTINGS,
  ADMIN_OVERVIEW,
  GET_AUTH_TOKEN,
  SET_AIRPORTS,
  SET_FLIGHT,
  SET_BOOKINGS,
  SET_REFUND_STATUS,
} from "./types";

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
  } else {
    localStorage.removeItem("access_token");
  }
  return {
    type: AUTH_TOKEN,
    payload: token,
  };
};
export const getAccessToken = () => {
  var token = localStorage.getItem("access_token");
  return {
    type: GET_AUTH_TOKEN,
    payload: token,
  };
};

export const setPersonalInfoDialogOpen = (open) => {
  return {
    type: PERSONAL_INFO_DIALOG_OPEN,
    payload: { open },
  };
};

export const setMenuDrawerOpen = (open) => {
  return {
    type: MENU_DRAWER_OPEN,
    payload: { open },
  };
};

export const setTableSettings = (settings) => {
  return {
    type: SET_TABLE_SETTINGS,
    payload: settings,
  };
};

export const setSnackbarSettings = (settings) => {
  return {
    type: SET_SNACKBAR_SETTINGS,
    payload: settings,
  };
};

export const setAirports = (airports) => {
  console.log(airports);
  return {
    type: SET_AIRPORTS,
    payload: airports,
  };
};

export const setBookings = (bookings) => {
  return {
    type: SET_BOOKINGS,
    payload: bookings,
  };
};

export const setRefundStatus = (refunds) => {
  return {
    type: SET_REFUND_STATUS,
    payload: refunds,
  };
};

export const setFlights = (flights) => {
  console.log(flights);
  return {
    type: SET_FLIGHT,
    payload: flights,
  };
};

export const getAdminOverview = () => {
  return async (dispatch, getState) => {
    try {
      let response = await LocalApi.get("/admin/overview");

      dispatch({
        type: ADMIN_OVERVIEW,
        payload: response.data,
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};
