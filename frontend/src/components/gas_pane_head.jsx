import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
class GasPaneHead extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          funmode: false,
          foodSelected: false,
          hotelSelected: false,
          barSelected: false,
          formData: {
            percentFull: 0,
            timeToHotel: 0,
            timeToFood: 0,
            maxDistance: this.props.maxDistance
          }
        }
      
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAddress = this.handleAddress.bind(this);
      this.shadowSubmit = this.shadowSubmit.bind(this);
      this.toggleFunmode = this.toggleFunmode.bind(this);
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

    handleAddress(latLng) {
      let newForm = Object.assign({}, this.state.formData);
      newForm.address = latLng;
      this.setState({formData: newForm});
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

 
    toggleFunmode() {
      if (this.state.funmode === false) {
         this.setState({funmode: true});
       } else {
        this.setState({ funmode: false });
       } 
    }
    

    
  shadowSubmit(){
    const vroom = new Audio();
    console.log("the script is running");
    vroom.src = "https://s3-us-west-1.amazonaws.com/wayfarer-sounds/BMW%2BDRIVEBY.mp3";
    vroom.play();
    const shadow = document.getElementsByClassName('shadow-submit')[0];
    shadow.click();
  }
    
    render() {

    return <div className="gas-pane-head">
        <button className="cool-mode" onClick={this.toggleFunmode} />
        <div className="gas-pane-form-container">
          <form className="gas-pane-form" onSubmit={this.handleSubmit}>
            <div className="gas-pane-input">
              <LocationSearchInput handleAddress={this.handleAddress} />
              <div className="percent-container">
                <span className={
                    this.state.funmode === true
                      ? "percent-label-fun"
                      : "percent-label"
                  }>How full is you tank?
                </span>

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
              <div className="gas-pane-submit" onClick={this.shadowSubmit}>
                <span>DO IT!</span>
              </div>
              <div className="gas-pane-text-bg" />
              <div className="gas-pane-submit-shadow" />
            </div>
            <input type="submit" className="shadow-submit" />
          </form>
        </div>
      </div>;
  }
}

export default GasPaneHead;

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.handleAddress(latLng))
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}