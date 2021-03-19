import { GET_COACHES, ADD_COACH, RESET_COACHES } from "./types";

const initialState = {
  data: [],
};

const handlers = {
  [GET_COACHES]: (state, { payload }) => ({
    ...state,
    data: [...state.data, ...payload],
  }),
  [ADD_COACH]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }),
  [RESET_COACHES]: (state) => initialState,
  DEFAULT: (state) => state,
};

export const coachReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
