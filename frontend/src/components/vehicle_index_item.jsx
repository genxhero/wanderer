import React from 'react';
import {Link} from 'react-router-dom';

class VehicleIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.fetchVehicle(this.props.vehicle._id);
  }

  render() {
    return(
    <div className="vehicle-item-container">
        <ul className="vehicle-item-stats">
          <li className="vehicle-stat-name">{this.props.vehicle.name}</li>
          <li className="vehicle-stat">Make: {this.props.vehicle.make}</li>
          <li className="vehicle-stat">Model: {this.props.vehicle.model}</li>
          <li className="vehicle-stat">Year: {this.props.vehicle.year}</li>
          <li className="vehicle-stat">Highway MPG: {this.props.vehicle.hwyMpg}</li>
          <li className="vehicle-stat">City MPG: {this.props.vehicle.cityMpg}</li>
          <li className="vehicle-stat">Tank Size: {this.props.vehicle.tankSize}</li>
        </ul>
        <Link to="/distance" className="select-your-vehicle" onClick={this.handleClick}>Select This Vehicle</Link>
      </div>
    );
  }
}

export default VehicleIndexItem