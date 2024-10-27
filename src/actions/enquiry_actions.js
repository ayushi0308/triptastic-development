import LocalApi from "./../apis/local";
import { handleServerError } from "./../helpers/error_helper";
import {
  ENQUIRY,
  ENQUIRIES,
  SET_SNACKBAR_SETTINGS,
  ENQUIRY_DETAILS_DIALOG_OPEN,
} from "./types";

export const getEnquiries = () => {
  return async (dispatch, getState) => {
    const { page, rowsPerPage } = getState().table_settings;
    try {
      let response = await LocalApi.get("/enquiries", {
        params: { page, rowsPerPage },
      });

      dispatch({
        type: ENQUIRIES,
        payload: response.data,
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const getEnquiry = (_id) => {
  return async (dispatch, getState) => {
    try {
      let response = await LocalApi.get(`/enquiries/${_id}`);

      dispatch({
        type: ENQUIRY,
        payload: response.data.enquiry,
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const createOrUpdateEnquiry = (formValues) => {
  return async (dispatch, getState) => {
    try {
      let response = {};

      response = await LocalApi.post("/api/contactUs", formValues);
      dispatch({
        type: ENQUIRY,
        payload: response.data,
      });

      const message = "Thank you for your enquiry. We will be in touch";
      dispatch({
        type: SET_SNACKBAR_SETTINGS,
        payload: {
          open: true,
          variant: "success",
          message,
        },
      });
    } catch (err) {
      handleServerError(err, dispatch);
    }
  };
};

export const setEnquiry = (enquiryDetails) => {
  return {
    type: ENQUIRY,
    payload: enquiryDetails,
  };
};

export const setEnquiryDetailsDialogOpen = (open) => {
  return {
    type: ENQUIRY_DETAILS_DIALOG_OPEN,
    payload: { open },
  };
};
