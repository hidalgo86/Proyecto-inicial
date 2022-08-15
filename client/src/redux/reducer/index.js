import {
  GET_ALL_DOGS,
  GET_NAME_DOGS,
  GET_FILTER_DOGS,
  GET_DETAIL_DOG,
  POST_CREATE_DOGS,
  GET_TEMPERAMENTS,
} from "../types";

const initialState = {
  dogs: [],
  detail: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_NAME_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_FILTER_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_DETAIL_DOG:
      return {
        ...state,
        detail: action.payload,
      };

    case POST_CREATE_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
