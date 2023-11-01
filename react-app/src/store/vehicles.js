//types

const GET_ALL_VEHICLES = "/get_all_vehicles";
const GET_VEHICLE_DETAILS = "/vehicle_details";
const DELETE_VEHICLE = "/delete_vehicle";
const GET_NINE_VEHICLES = "/get_nine_vehicles";

//action creator

const actionGetVehicles = (vehicles) => ({ type: GET_ALL_VEHICLES, vehicles });
const actionGetVehicleDetails = (vehicle) => ({ type: GET_VEHICLE_DETAILS, vehicle });
const actionDeleteVehicle = (id) => ({ type: DELETE_VEHICLE, id });
const actionGetNineVehicles = (vehicles) => ({ type: GET_NINE_VEHICLES, vehicles });

//Thunks

//getAllvehiclesThunk
export const getTenRandomVehiclesThunk = () => async (dispatch) => {
   const res = await fetch("/api/vehicles");

   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetNineVehicles(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

//getAllOwnervehicles Thunk
export const getNineRandomNonOwnerVehicles = () => async (dispatch) => {
   const res = await fetch("/api/vehicles/current");
   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetNineVehicles(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

export const getEveryVehicleThunk = () => async (dispatch) => {
   const res = await fetch("/api/vehicles/all");
   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetVehicles(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

//getvehicleDetails Thunk
export const getVehicleDetailsThunk = (id) => async (dispatch) => {
   const res = await fetch(`/api/vehicles/${id}`);
   if (res.ok) {
      const data = await res.json();
      dispatch(actionGetVehicleDetails(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

//createVehicle Thunk
export const createVehicleThunk = (form) => async (dispatch) => {
   const res = await fetch("/api/vehicles/new", {
      method: "vehicle",
      body: form,
   });

   if (res.ok) {
      const { resPost } = await res.json();
      dispatch(actionGetVehicleDetails(resPost));
      return resPost;
   } else {
      const data = await res.json();
      return data;
   }
};

//createvehicleNoAlbums Thunk
export const createVehicleThunkNoAlbums = (form) => async (dispatch) => {
   const res = await fetch("/api/vehicles/no_album", {
      method: "vehicle",
      body: form,
   });

   if (res.ok) {
      const { resPost } = await res.json();
      dispatch(actionGetVehicleDetails(resPost));
      return resPost;
   } else {
      const data = await res.json();
      return data;
   }
};

//updatevehicle Thunk
export const updateVehicleThunk = (form, vehicleId) => async (dispatch) => {
   try {
      const res = await fetch(`/api/vehicles/update/${vehicleId}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(form),
      });

      if (res.ok) {
         const resPost = await res.json();
         return resPost;
      } else {
         return { errors: "There was an error updating your vehicle" };
      }
   } catch (error) {
      const data = await JSON.stringify(error);
      return data;
   }
};

//deletevehicle Thunk
export const deleteVehicleThunk = (id) => async (dispatch) => {
   const res = await fetch(`/api/vehicles/delete/${id}`, {
      method: "DELETE",
   });

   if (res.ok) {
      dispatch(actionDeleteVehicle(id));
   } else {
      return { errors: "There was an error deleting your vehicle!" };
   }
};

//Reducer

const initialState = { allVehicles: {}, nineVehicles: {} };

export default function vehicleReducer(state = initialState, action) {
   let newState;
   switch (action.type) {
      case GET_ALL_VEHICLES:
         newState = { ...state, allVehicles: {} };
         action.vehicles.forEach((vehicle) => (newState.allVehicles[vehicle.id] = vehicle));
         return newState;

      case GET_VEHICLE_DETAILS:
         newState = { ...state, allVehicles: { ...state.allVehicles } };
         newState.allVehicles[action.vehicle.id] = action.vehicle;
         return newState;

      case DELETE_VEHICLE:
         newState = { ...state, allvehicles: { ...state.allVehicles } };
         delete newState.allVehicles[action.id];
         return newState;

      case GET_NINE_VEHICLES:
         newState = { ...state, nineVehicles: {} };
         action.vehicles.forEach((vehicle) => (newState.nineVehicles[vehicle.id] = vehicle));
         return newState;

      default:
         return state;
   }
}