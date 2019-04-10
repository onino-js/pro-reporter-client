import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Contacts from "../../pages/Contacts/Contacts";
import Editor from "../../pages/Editor/Editor";
import Preview from "../../pages/Editor/Preview/Preview";

interface Props {}

class Routes extends React.Component<Props> {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/editor" component={Editor} />
          <Route path="/preview" component={Preview} />
        </React.Fragment>
      </Router>
    );
  }
}

export default Routes;
