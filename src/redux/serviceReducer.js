import { ADD_SERVICE, GET_SERVICES, RESET_SERVICES } from "./types";

const initialState = {
  data: [],
};

const handlers = {
  [GET_SERVICES]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [ADD_SERVICE]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }),
  [RESET_SERVICES]: (state) => initialState,
  DEFAULT: (state) => state,
};

export const serviceReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
