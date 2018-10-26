import React from 'react';

class AddVehicleForm extends React.Component  {

   constructor(props){
     super(props);
     this.state = {
       make: "",
       model: "",
       name: "",
       year: "",
       hwyMpg: "",
       cityMpg: "",
       tankSize: ""
     }
     this.update = this.update.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event)  {
     event.preventDefault();
     console.log(this.state);
     if (this.props.currentUser.id) {
      this.props.addVehicleOnline(this.state);
     } else {
      this.props.addVehicleOffline(this.state);
    }
   }

  update(field) {
    return event => this.setState({
      [field]: event.currentTarget.value
    });
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render(){
    return(
      <div className="add-car-page">
        <div className="add-car-form-container">
          <form className="add-car-form" onSubmit={this.handleSubmit}>
            {this.renderErrors()}
            <input
            type="text"
            className="add-car-field"
            placeholder="Name your vehicle"
            onChange={this.update("name")}
             />
            <input
              type="number"
              className="add-car-field"
              placeholder="Vehicle year (e.g. 1997)"
              onChange={this.update("year")}
            />
            <input
              type="text"
              className="add-car-field"
              placeholder="Vehicle make (e.g., Oldsmobile)"
              onChange={this.update("make")}
            />
            <input
              type="text"
              className="add-car-field"
              placeholder="Vehicle model (e.g., Cutlass Supreme)"
              onChange={this.update("model")}
            />
            <input
              type="number"
              className="add-car-field"
              placeholder="Size of vehicle fuel tank in gallons"
              onChange={this.update("tankSize")}
            />


            <div className="car-mpg-container">
              <input className="add-car-field" placeholder="MPG City" type="number" onChange={this.update("cityMpg")}/>
              <input className="add-car-field" placeholder="MPG Highway" type="number" onChange={this.update("hwyMpg")} />
            </div>
            <span>
              Don't know your car's mpg? <a href="https://www.fueleconomy.gov/mpg/MPG.do">Click Here!</a>
            </span>
            <button type="submit">Add Car</button>
          </form>
        </div>
      </div>
    );
  }
};

export default AddVehicleForm;