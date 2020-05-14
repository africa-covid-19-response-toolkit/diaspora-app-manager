import { USER } from "../actions/types";

const initialState = {
  fetching: false,
  currentUser: {},
  currentUserData: {},
  authenticated: false,
  usersList: [],
  saveSuccessful: false,
  selectedUserData: {},
  selectedUserWorks: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER.AUTHENTICATING:
      return { ...state, fetching: true };
    case USER.AUTHENTICATED:
      return {
        ...state,
        fetching: false,
        currentUser: { uid: payload.uid },
        authenticated: true
      };
    case USER.AUTHENTICATION_FAILED:
      return { ...state, fetching: false };
    case USER.DATA_FETCHED:
      return { ...state, currentUserData: payload };
    case USER.LIST_FETCHED:
      return { ...state, usersList: payload };
    case USER.CREATING:
      return { ...state, fetching: true };
    case USER.CREATED:
      return { ...state, saveSuccessful: true, fetching: false };
    case USER.CREATION_FAILED:
      return { ...state, saveSuccessful: false, fetching: false };
    case USER.UPDATING:
      return { ...state, fetching: true };
    case USER.UPDATED:
      return { ...state, saveSuccessful: true, fetching: false };
    case USER.UPDATE_FAILED:
      return { ...state, saveSuccessful: false, fetching: false };
    case USER.USER_WORK_DATA_FETCHED:
      return { ...state, userWorks: payload };
    case USER.USER_WORK_SELECTED_FETCHED:
      return { ...state, userWorkSelected: payload };
    case USER.USER_WORK_SAVED:
      return { ...state, saveSuccessful: true, fetching: false };
    case USER.USER_WORK_UPDATED:
      return { ...state, saveSuccessful: true, fetching: false };
    case USER.SELECTED_USER_WORK_DATA_FETCHED:
      return { ...state, selectedUserWorks: payload };
    case USER.SELECTED_USER_DATA_FETCHED:
      return { ...state, selectedUserData: payload };
    case USER.ACTION_SUCCESSFUL:
      return { ...state, actionSuccessful: true };
    case USER.START_ACTION:
      return { ...state, actionSuccessful: false };
    case USER.SIGN_OUT:
      return {
        ...state,
        currentUser: {},
        currentUserData: {},
        authenticated: false
      };

    default:
      return state;
  }
};
