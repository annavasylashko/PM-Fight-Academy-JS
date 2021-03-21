import {
  ADD_COACH,
  GET_COACHES,
  UPDATE_COACH,
  DELETE_COACH,
  RESET_COACHES,
} from "./types";

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
  [UPDATE_COACH]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.map((item) => (item.id === payload.id ? payload : item)),
    ],
  }),
  [DELETE_COACH]: (state, { payload }) => ({
    ...state,
    data: [...state.data.filter((item) => item.id !== payload)],
  }),
  [RESET_COACHES]: (state) => initialState,
  DEFAULT: (state) => state,
};

export const coachReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
