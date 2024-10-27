import axios from "axios";
import { handleServerError } from "./../helpers/error_helper";
import { TOUR, TOURS, SET_SNACKBAR_SETTINGS, CREATE_FLIGHT } from "./types";
import * as Constants from "../constants";

import LocalApi from "../apis/local";

export const getTours = (params = {}) => {
  return async (dispatch, getState) => {
    try {
      let response = await LocalApi.get("/tours", { params });

      dispatch({
        type: TOURS,
        payload: response.data,
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const getTour = (_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await LocalApi.get(`/tours/${_id}`);

      dispatch({
        type: TOUR,
        payload: response.data.tour,
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const createFlights = (form) => {
  return async (dispatch, getState) => {
    try {
      LocalApi.post("/api/flights", form)
        .then((response) => {
          console.log(response);

          dispatch({
            type: CREATE_FLIGHT,
            payload: response.data,
          });

          alert("Succesfully Created Flight");
          // dispatch({
          //   type: SET_SNACKBAR_SETTINGS,
          //   payload: {
          //     open: true,
          //     variant: "success",
          //     message: `Succesfully Created Flight`,
          //   },
          // });
        })
        .catch((err) => {
          let message = "Server Error. Please try again later";
          if (err.response && err.response.status === 401) {
            message = "Invalid email or password";
          }
          dispatch({
            type: SET_SNACKBAR_SETTINGS,
            payload: {
              open: true,
              variant: "error",
              message: message,
            },
          });
        });
    } catch (err) {}
  };
};

export const createOrUpdateTour = (_id, formData) => {
  formData.delete("__v");
  formData.delete("_id");
  formData.delete("updatedAt");
  formData.delete("createdAt");
  return async (dispatch, getState) => {
    try {
      let response = {};
      if (!_id) {
        response = await LocalApi.post("/tours", formData);
      } else {
        response = await LocalApi.put(`/tours/${_id}`, formData);
      }
      dispatch({
        type: TOUR,
        payload: response.data,
      });
      const { page, rowsPerPage } = getState().table_settings;
      response = await LocalApi.get("/tours", {
        params: { page, rowsPerPage },
      });
      dispatch({
        type: TOURS,
        payload: response.data,
      });
      const message = _id ? "updated" : "created";
      dispatch({
        type: SET_SNACKBAR_SETTINGS,
        payload: {
          open: true,
          variant: "success",
          message: `Succesfully ${message}`,
        },
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const setTour = (tourDetails) => {
  return {
    type: TOUR,
    payload: tourDetails,
  };
};
