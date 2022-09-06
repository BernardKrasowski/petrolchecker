import { DATA_ACTION_TYPES } from "./data.types.js";

const INITIAL_STATE = {
  currentData: null,
};
export const dataReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case DATA_ACTION_TYPES.SET_CURRENT_DATA:
      return {
        ...state,
        currentData: payload,
      };
    default:
      return state;
  }
};
