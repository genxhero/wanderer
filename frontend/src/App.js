import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import GreetingContainer from "./components/greeting/greeting_container";
import SignUpFormContainer from "./components/session_form/signup_form_container";
import LogInFormContainer from "./components/session_form/login_form_container";
import Splash from "./components/splash";
import { AuthRoute, ProtectedRoute} from "./util/route_util";
import GasPaneHead from "./components/gas_pane_head";

const AddVehicle = () => (
  <div className="add-car-page">
    <h1>New car info here</h1>
    <div className="add-car-form-container">
     <form className="add-car-form">

     </form>
    </div>
  </div>
);

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
      <ProtectedRoute exact path ="/addvehicle" component={AddVehicle}/>
      <Route exact path="/" component={Splash} />
      <Route exact path="/distance" component={GasPaneHead}/>
      
    </Switch>
  </div>
);


export default App;
