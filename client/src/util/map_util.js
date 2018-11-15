export const GET_ERRORS = "GET_ERRORS";
export const RECEIVE_MAP_DATA = "RECEIVE_MAP_DATA";

export const receiveMapData = mapData => ({
  type: RECEIVE_MAP_DATA,
  payload: mapData
});