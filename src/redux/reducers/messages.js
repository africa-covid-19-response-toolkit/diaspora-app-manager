import { MESSAGES } from "../actions/types";

const initialState = {
  fetching: false,
  messages: [],
  saveSuccessful: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGES.FETCHING:
      return { ...state, fetching: true };
    case MESSAGES.FETCHED:
      return { ...state, fetching: false, messages: payload };
    case MESSAGES.CREATION_FAILED:
      return { ...state, fetching: false, saveSuccessful: false };
    case MESSAGES.UPDATE_FAILED:
      return { ...state, fetching: false };
    case MESSAGES.ADD:
      return { ...state, fetching: false };
    case MESSAGES.UPDATE:
      return { ...state, fetching: false };
    case MESSAGES.SAVED:
      return { ...state, saveSuccessful: true };

    default:
      return state;
  }
};
