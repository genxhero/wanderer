
import React from 'react';
import VehicleIndexItem from './vehicle_index_item';
import {Link} from 'react-router-dom';

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
    vehicles = "No vehicles found"
  }
   return(
   <div className="vehicle-index-container">  
       <div className="vehicle-index-topper"> 
         <div className="vehicle-index-greeting">{this.props.currentUser.username} 's cars</div>
         <Link className="new-car-link" to='/addvehicle'>Add another car?</Link>
       </div>    
    
      <ul className="vehicle-list">{vehicles}</ul>
   </div>
   );
  }
}

export default VehicleIndex;