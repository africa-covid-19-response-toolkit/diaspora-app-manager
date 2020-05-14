import { QUESTIONS } from "../actions/types";

const initialState = {
  fetching: false,
  questions: [],
  saveSuccessful: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case QUESTIONS.FETCHING:
      return { ...state, fetching: true };
    case QUESTIONS.FETCHED:
      return { ...state, fetching: false, questions: payload };
    case QUESTIONS.CREATION_FAILED:
      return { ...state, fetching: false, saveSuccessful: false };
    case QUESTIONS.UPDATE_FAILED:
      return { ...state, fetching: false };
    case QUESTIONS.ADD:
      return { ...state, fetching: false };
    case QUESTIONS.UPDATE:
      return { ...state, fetching: false };
    case QUESTIONS.SAVED:
      return { ...state, saveSuccessful: true };

    default:
      return state;
  }
};
