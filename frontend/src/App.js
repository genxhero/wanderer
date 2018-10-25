import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import {addVehicleOnline} from "./components/vehicle_actions";
import GreetingContainer from "./components/greeting/greeting_container";
import SignUpFormContainer from "./components/session_form/signup_form_container";
import LogInFormContainer from "./components/session_form/login_form_container";
import Splash from "./components/splash";
import { AuthRoute} from "./util/route_util";
import GasPane from "./components/gas_pane";


class AddVehicle extends React.Component  {

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

   handlsSubmit(event)  {
     event.preventDefault();
   }

  update(field) {
    return event => this.setState({
      [field]: event.currentTarget.value
    });
  }

  render(){
  

    return(

      <div className="add-car-page">
        <div className="add-car-form-container">
          <form className="add-car-form" onSubmit="">
            <input className="add-car-field" placeholder="Name your vehicle" />
            <input
              className="add-car-field"
              placeholder="Vehicle make (e.g., Oldsmobile)"
            />
            <input
              className="add-car-field"
              placeholder="Vehicle model (e.g., Cutlass Supreme)"
            />
            <input
              className="add-car-field"
              placeholder="Size of vehicle fuel tank in gallons"
            />


            <div className="car-mpg-container">
              <input className="add-car-field" placeholder="MPG City" />
              <input className="add-car-field" placeholder="MPG Highway" />
            </div>
            <span>
              Don't know your car's mpg? <a href="https://www.fueleconomy.gov/mpg/MPG.do">Click Here!</a>
            </span>
            <button type="submit"></button>
          </form>
        </div>
      </div>
    );

  }
 
};


const App = () => (
  <div>
    <header>
      <Link to="/" className="header-link">
        <h1>Wayfarer</h1>
      </Link>
      <GreetingContainer />
    </header>
    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <Route exact path="/" component={Splash} />
      <Route exact path="/distance" component={GasPane}/ >
      <Route path="/addvehicle" component={AddVehicle} />
      
    </Switch>
  </div>
);

export default App;
