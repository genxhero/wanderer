
import React from 'react';
import VehicleIndexItem from './vehicle_index_item';

class VehicleIndex extends React.Component {

  componentDidMount () {
    this.props.fetchUserVehicles();
  }

  render() {
  let vehicles = "";
  if (this.props.vehicles) {
    vehicles = Object.values(this.props.vehicles).map(vehicle => <VehicleIndexItem
      key={vehicle._id}
      vehicle={vehicle}
      fetchVehicle={this.props.fetchVehicle}
      receiveVehicle={this.props.receiveVehicle}/>
      );
  } else {
    vehicles = "No Vehicles Found"
  }
   return(
   <div className="vehicle-index-container">
      <h2 className="vehicle-index-greeting">{this.props.currentUser.username} 's cars</h2>
      <ul className="vehicle-list">{vehicles}</ul>
   </div>
   );
  }
}

export default VehicleIndex;