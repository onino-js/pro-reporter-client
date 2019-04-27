import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Contacts from "../../pages/Contacts/Contacts";
import Editor from "../../pages/Editor/Editor";
import Preview from "../../pages/Editor/Preview/Preview";
import Acrhives from "../../pages/Archives/Archives";
import UserInformations from "../../pages/UserAccount/UserInformations/UserInformations";
import UserBilling from "../../pages/UserAccount/UserBilling/UserBilling";
import UserPlan from "../../pages/UserAccount/UserPlan/UserPlan";
import UserSettings from "../../pages/UserAccount/UserSettings/UserSettings";
import TemplateMenu from "../../pages/TemplateMenu/TemplateMenu";
import OnGoingMenu from "../../pages/OnGoingMenu/OnGoingMenu";
import Database from "../../pages/Database/Database";
import CloudStorage from "../../pages/CloudStorage/CloudStorage";
import Statistics from "../../pages/Statistics/Statistics";
import InProgressModal from "../modals/InProgressModal";

interface Props {}

class Routes extends React.Component<Props> {
  public render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={OnGoingMenu} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/archives" component={Acrhives} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/editor/:reportId?" component={Editor} />
          <Route path="/preview" component={Preview} />
          <Route path="/templates" component={TemplateMenu} />
          <Route path="/on-going" component={OnGoingMenu} />
          <Route path="/database" component={Database} />
          <Route path="/cloud-storage" component={CloudStorage} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/user-informations" component={UserInformations} />
          <Route path="/user-plan" component={UserPlan} />
          <Route path="/user-billing" component={UserBilling} />
          <Route path="/user-settings" component={UserSettings} />
          <Redirect to="/" />
        </React.Fragment>
        <InProgressModal />
      </Router>
    );
  }
}

export default Routes;
