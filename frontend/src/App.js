import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import GreetingContainer from "./components/greeting/greeting_container";
import SignUpFormContainer from "./components/session_form/signup_form_container";
import LogInFormContainer from "./components/session_form/login_form_container";
import Splash from "./components/splash";
import { AuthRoute} from "./util/route_util";
import GasPane from "./components/gas_pane";
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
      
    </Switch>
  </div>
);

export default App;
