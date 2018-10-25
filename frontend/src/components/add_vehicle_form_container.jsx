import { addVehicleOnline, addVehicleOffline } from "../util/vehicles_util.js";
import {connect} from "react-redux";
import AddVehicleForm from "./add_vehicle_form";

const mapStateToProps = state => ({
  errors: Object.values(state.errors.vehicles),
  vehicles: state.vehicles,
  currentUser: state.session
});

const mapDispatchToProps = dispatch => ({
  addVehicleOnline: (formData) => dispatch(addVehicleOnline(formData)),
  addVehicleOffline: (formData) => dispatch(addVehicleOffline(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleForm);