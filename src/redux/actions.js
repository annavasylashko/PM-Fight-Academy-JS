import {
  ADD_SERVICE,
  GET_SERVICES,
  RESET_SERVICES,
  ADD_COACH,
  GET_COACHES,
  RESET_COACHES,
  GET_CLIENTS,
  RESET_CLIENTS,
} from "./types";
import Api from "./axios";

export function getServices() {
  return async (dispatch) => {
    const services = await Api.get("Service/");
    dispatch({
      type: GET_SERVICES,
      payload: services.data,
    });
  };
}

export function addService(service) {
  return async (dispatch) => {
    try {
      const response = await Api.post("Service/", service);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: ADD_SERVICE,
      payload: service,
    });
  };
}

export function resetService() {
  return (dispatch) => {
    dispatch({
      type: RESET_SERVICES,
    });
  };
}

export function getCoaches() {
  return async (dispatch) => {
    const coaches = await Api.get("Coach/");
    dispatch({
      type: GET_COACHES,
      payload: coaches.data,
    });
  };
}

export function addCoach(coach) {
  return async (dispatch) => {
    try {
      const response = await Api.post("Coach/", coach);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: ADD_COACH,
      payload: coach,
    });
  };
}

export function resetCoach() {
  return (dispatch) => {
    dispatch({
      type: RESET_COACHES,
    });
  };
}

export function getClients() {
  return async (dispatch) => {
    const clients = await Api.get("Client/");
    dispatch({
      type: GET_CLIENTS,
      payload: clients.data,
    });
  };
}

export function resetClient() {
  return (dispatch) => {
    dispatch({
      type: RESET_CLIENTS,
    });
  };
}
