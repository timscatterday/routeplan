import * as APIUtil from "../util/trip_api_util";

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_USER_TRIPS = "RECEIVE_USER_TRIPS";
export const RECEIVE_NEW_TRIP = "RECEIVE_NEW_TRIP";
export const REMOVE_TRIP = 'REMOVE_TRIP';

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
});

export const receiveUserTrips = trips => ({
  type: RECEIVE_USER_TRIPS,
  trips
});

export const receiveNewTrip = trip => ({
  type: RECEIVE_NEW_TRIP,
  trip
});

export const removeTrip = tripId => ({
  type: REMOVE_TRIP,
  tripId
});

export const fetchTrips = () => dispatch =>
  APIUtil.getTrips()
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => console.log(err));

export const fetchUserTrips = id => dispatch =>
  APIUtil.getUserTrips(id)
    .then(trips => dispatch(receiveUserTrips(trips)))
    .catch(err => console.log(err));

export const createTrip = data => dispatch =>
  APIUtil.makeTrip(data)
    .then(trip => dispatch(receiveNewTrip(trip)))
    .catch(err => console.log(err));

export const editTrip = data => dispatch => {
  return APIUtil.updateTrip(data)
    .then(trip => dispatch(receiveNewTrip(data)))
    .catch(err => console.log(err));
}

export const destroyTrip = dataId => dispatch => {
  return APIUtil.deleteTrip(dataId)
    .then(() => dispatch(removeTrip(dataId)));
}