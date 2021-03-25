import {
  ADD_SERVICE,
  GET_SERVICES,
  RESET_SERVICES,
  ADD_COACH,
  GET_COACHES,
  UPDATE_COACH,
  DELETE_COACH,
  RESET_COACHES,
  GET_CLIENTS,
  RESET_CLIENTS,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  GET_SLOTS,
  ADD_SLOT,
  UPDATE_SLOT,
  DELETE_SLOT,
  RESET_SLOTS,
  GET_QUALIFICATIONS,
  ADD_QUALIFICATION,
  DELETE_QUALIFICATION,
  RESET_QUALIFICATIONS,
  GET_BOOKINGS,
  RESET_BOOKINGS,
  DELETE_BOOKING,
} from "./types";
import {mockApi as Api, realApi as Api2} from "./axios";

//

export function getServices() {
  return async (dispatch) => {
    const services = await Api.get("/Services");
    dispatch({
      type: GET_SERVICES,
      payload: services.data,
    });
  };
}

export function addService(service) {
  return async (dispatch) => {
    try {
      const response = await Api.post("/Services", service);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: ADD_SERVICE,
      payload: service,
    });
  };
}

export function updateService(service) {
  return async (dispatch) => {
    try {
      const response = await Api.patch(`Services/${service.id}`, service);

    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: UPDATE_SERVICE,
      payload: service,
    });
  };
}

export function deleteService(serviceId) {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`Services/${serviceId}`);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: DELETE_SERVICE,
      payload: serviceId,
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

//

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

export function updateCoach(coach) {
  return async (dispatch) => {
    try {
      const response = await Api.patch(`Coach/update/${coach.id}`, coach);
    } catch (e) {
      console.log(e.message);
    }
    dispatch({
      type: UPDATE_COACH,
      payload: coach,
    });
  };
}

export function deleteCoach(coachId) {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`Service/${coachId}`);
    } catch (e) {
      console.log(e.message);
    }
    dispatch({
      type: DELETE_COACH,
      payload: coachId,
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

//

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

//

export function getSlots() {
  return async (dispatch) => {
    const slots = await Api.get("Slots/");
    dispatch({
      type: GET_SLOTS,
      payload: slots.data,
    });
  };
}

export function addSlot(slot) {
  return async (dispatch) => {
    try {
      const response = await Api.post("Slots/", slot);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: ADD_SLOT,
      payload: slot,
    });
  };
}

export function updateSlot(slot) {
  return async (dispatch) => {
    try {
      const response = await Api.patch(`Slots/update/${slot.id}`, slot);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: UPDATE_SLOT,
      payload: slot,
    });
  };
}

export function deleteSlot(slotId) {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`Slots/${slotId}`);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: DELETE_SLOT,
      payload: slotId,
    });
  };
}

export function resetSlots() {
  return (dispatch) => {
    dispatch({
      type: RESET_SLOTS,
    });
  };
}

//

//BOOKING

//

export function getQualifications(param, id) {
  return async (dispatch) => {
    const qualifications = await Api.get(`Qualification?${param}=${id}`);
    dispatch({
      type: GET_QUALIFICATIONS,
      payload: qualifications.data,
    });
  };
}

export function addQualification(qualification) {
  return async (dispatch) => {
    try {
      const response = await Api.post("Qualification/", qualification);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: ADD_QUALIFICATION,
      payload: qualification,
    });
  };
}

export function deleteQualifications(qualificationId) {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`Qualification/${qualificationId}`);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: DELETE_QUALIFICATION,
      payload: qualificationId,
    });
  };
}

export function resetQualifications() {
  return (dispatch) => {
    dispatch({
      type: RESET_QUALIFICATIONS,
    });
  };
}

export function getBookings() {
  return async (dispatch) => {
    const booking = await Api.get("Booking/");
    dispatch({
      type: GET_BOOKINGS,
      payload: booking.data,
    });
  };
}

export function resetBookings() {
  return (dispatch) => {
    dispatch({
      type: RESET_BOOKINGS,
    });
  };
}

export function deleteBooking(bookingId) {
  return async (dispatch) => {
    try {
      const response = await Api.delete(`Booking/${bookingId}`);
    } catch (e) {
      console.log(e.message);
    }

    dispatch({
      type: DELETE_BOOKING,
      payload: bookingId,
    });
  };
}
