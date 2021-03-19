import { GET_CLIENTS, RESET_CLIENTS } from "./types";

const initialState = {
  data: [],
};

const handlers = {
  [GET_CLIENTS]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [RESET_CLIENTS]: (state) => initialState,
  DEFAULT: (state) => state,
};

export const clientReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
