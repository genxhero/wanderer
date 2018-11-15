import { fetchUserVehicles, fetchVehicle, receiveVehicle } from "../../util/vehicles_util.js";
import { connect } from "react-redux";
import VehicleIndex from "./vehicle_index";

const mapStateToProps = state => ({
  errors: Object.values(state.errors.vehicles),
  vehicles: state.vehicles,
  currentUser: state.session
});

const mapDispatchToProps = dispatch => ({
  fetchUserVehicles: () => dispatch(fetchUserVehicles()),
  fetchVehicle: (id) => dispatch(fetchVehicle(id)),
  receiveVehicle: (vehicle) => dispatch(receiveVehicle(vehicle))
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleIndex);