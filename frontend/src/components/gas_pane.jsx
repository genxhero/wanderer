import React from "react";
import GasPaneHead from "./gas_pane_head";
import GasPaneBody from "./gas_pane_body";
import { connect } from 'react-redux';
import { receiveMapData } from '../util/map_util';

const mapStateToProps = state => ({
  vehicles: state.vehicles,
  mapData: state.maps,
  maxDistance: state.vehicles.maxRouteLength
});

const mapDispatchToProps = dispatch => ({
  receiveMapData: (mapData) => dispatch(receiveMapData(mapData))
});

class GasPane extends React.Component {
  render () {
  return (
    <div className="gas-pane-page">
      <GasPaneHead vehicles={this.props.vehicles} mapData={this.props.mapData} receiveMapData={this.props.receiveMapData} maxDistance={this.props.maxDistance} />
      <GasPaneBody vehicles={this.props.vehicles} mapData={this.props.mapData} />
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GasPane);