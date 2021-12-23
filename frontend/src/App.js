import React from "react";
//import "./index.css";
import DragNDrop from "./pages/DragNDrop";
import { ReactFlowProvider } from "react-flow-renderer";
// import WorkEnvironment from "./pages/workEnvironment";
import Authentication from "./pages/authentication";
import Main from "./pages/main";
import User from "./pages/user";
import Navigation from "./components/navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticationProvider } from "./context/authenticationContext";

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <ReactFlowProvider>
          <Navigation></Navigation>
          <Switch>
            <Route path="/" exact component={Main} />
            <Route
              path="/authentication/:isSignUp"
              exact
              component={Authentication}
            />
            <Route path="/work_environment" exact component={DragNDrop} />
            <Route path="/user" exact component={User} />
          </Switch>
        </ReactFlowProvider>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
