import { LAYOUT } from './types';

export const sidebarCollapseStateChanged = payload => ({
  type: LAYOUT.SIDE_BAR_COLLAPSE_STATE_CHANGED,
  payload,
});