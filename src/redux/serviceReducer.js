import {
  ADD_SERVICE,
  DELETE_SERVICE,
  GET_SERVICES,
  RESET_SERVICES,
  UPDATE_SERVICE,
} from "./types";

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
  [UPDATE_SERVICE]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.map((item) => (item.id === payload.id ? payload : item)),
    ],
  }),
  [DELETE_SERVICE]: (state, { payload }) => ({
    ...state,
    data: [...state.data.filter((item) => item.id !== payload)],
  }),
  [RESET_SERVICES]: (state) => initialState,
  DEFAULT: (state) => state,
};
export const serviceReducer = (state = initialState, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
