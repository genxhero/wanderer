import React from 'react';
import {connect} from 'react-redux';
import {receiveMapData} from '../util/map_util';

const mapStateToProps = state => ({
  // maxDistance: state.vehicles.maxRouteLength
  maxDistance: 100
});

const mapDispatchToProps = dispatch => ({
  receiveMapData: (mapData) => dispatch(receiveMapData(mapData))
});

class GasPaneHead extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          foodSelected: false,
          hotelSelected: false,
          barSelected: false,
          formData: {
            percentFull: 0,
            timeToHotel: 0,
            timeToFood: 0,
            maxDistance: 0
          }
        }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // calculateMaxDistance() {
    //   let newForm = Object.assign({}, this.state.formData);
    //   let actualPercent = parseInt(this.state.formData.percentFull, 10);
    //   let actualMax = (this.props.maxDistance * actualPercent) * 16.09344;
    //   newForm.percentFull = actualPercent;
    //   newForm.maxDistance = actualMax;
    //   this.setState({formData: newForm});
    // }

    // calculateHours() {
    //   let newForm = Object.assign({}, this.state.formData);
    //   let actualHotel = parseInt(this.state.formData.timeToHotel, 10) * 3600
    //   let actualFood = parseInt(this.state.formData.timeToFood, 10) * 3600
    //   newForm.timeToHotel = actualHotel;
    //   newForm.timeToFood = actualFood;
    //   this.setState({ formData: newForm });
    // }

    update(field) {
      return e => {
      let newForm = Object.assign({}, this.state.formData);
      newForm[field] = e.target.value;
      this.setState({formData: newForm});
      }
    }

    // all conversions are done in handleSubmit because the helper functions weren't working
    handleSubmit(e) {
      e.preventDefault();
      let newForm = Object.assign({}, this.state.formData);
      let actualHotel = parseInt(this.state.formData.timeToHotel, 10) * 3600;
      let actualFood = parseInt(this.state.formData.timeToFood, 10) * 3600;
      let actualPercent = parseInt(this.state.formData.percentFull, 10);
      let actualMax = (this.props.maxDistance * actualPercent) * 16.09344;
      newForm.percentFull = actualPercent;
      newForm.maxDistance = Math.trunc(actualMax);
      newForm.timeToHotel = actualHotel;
      newForm.timeToFood = actualFood;
      console.log(newForm);
      this.props.receiveMapData(newForm);
    }

  render() {
    return <div className="gas-pane-head">
        <div className="gas-pane-form-container">
          <form className="gas-pane-form" onSubmit={this.handleSubmit}>
            <div className="gas-pane-input">
              <input id="start-loc" className="gas-pane-input-field" placeholder="Where to??" />
              <div className="percent-container">
                <span className="percent-label">How full is you tank?</span>
                <span className="percent-sign">%</span>
              <input id="tank-percent" className="gas-pane-input-field" placeholder="100" value={this.state.formData.percentFull} onChange={this.update("percentFull")} />
              </div>
            </div>

            <div className="gas-pane-checkboxes">
              <span className="gas-pane-choices-label">
                After how many hours of driving will you...
              </span>
              <input className="gas-pane-choice" placeHolder="Be hungry like the wolf" value={this.state.formData.timeToFood} onChange={this.update("timeToFood")} />
              <input className="gas-pane-choice" placeHolder="Have to stop for the night" value={this.state.formData.timeToHotel} onChange={this.update("timeToHotel")} />
            </div>
            <div className="button-div">
              <input className="gas-pane-submit" type="submit" value="Do It!!" />
              <div className="gas-pane-text-bg" />
              <div className="gas-pane-submit-shadow" />
            </div>
          </form>
        </div>
      </div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GasPaneHead);