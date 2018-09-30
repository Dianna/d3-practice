import React from "react";
import { Route, Redirect } from "react-router-dom";

import Animations from "./pages/Animations";
import ReactD3 from "./pages/ReactD3";
import Shapes from "./pages/Shapes";
import Transitions from "./pages/Transitions";
import BasicSvg from "./pages/BasicSvg";
import GraphAxes from "./pages/GraphAxes";

function Routes() {
  return (
    <div className="main-content">
      <Route
        exact
        path="/"
        render={props => (
          <Redirect
            to={{
              pathname: "/animation"
            }}
          />
        )}
      />
      <Route path="/animations" component={Animations} />
      <Route path="/react-d3" component={ReactD3} />
      <Route path="/shapes" component={Shapes} />
      <Route path="/transitions" component={Transitions} />
      <Route path="/basic-svg" component={BasicSvg} />
      <Route path="/axes" component={GraphAxes} />
    </div>
  );
}

export default Routes;
