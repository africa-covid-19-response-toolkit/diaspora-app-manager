import { LAYOUT } from '../actions/types';

const initialState = {
  sidebarCollapsed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LAYOUT.SIDE_BAR_COLLAPSE_STATE_CHANGED:
      return { ...state, sidebarCollapsed: payload };

    default:
      return state;
  }
};
