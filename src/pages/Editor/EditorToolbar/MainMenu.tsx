import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { Report } from "../../../stores/report";
import { Menu } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../../stores/report.store";
import { UiStore } from "../../../stores/ui.store";
import { deleteAllActiveReports } from "../../../services/firebase.srevice";
import { AuthStore } from "../../../stores/auth.store";
import { FirebaseStore } from "../../../stores/firebaseStore";
import { ProMenuItem, ProMenuIcon } from "../../../components/ui/Buttons";

interface Iprops extends RouteComponentProps {
  reportStore?: ReportStore;
  uiStore?: UiStore;
  authStore?: AuthStore;
  firebaseStore?: FirebaseStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  Report: allStores.reportStore.activeReport,
  reportStore: allStores.reportStore,
  authStore: allStores.authStore,
  firebaseStore: allStores.firebaseStore,
}))
@observer
class MainMenu extends React.Component<Iprops> {
  private showLoadReportModal = () => {
    this.props.uiStore!.showModal("load-report");
  };
  private empty = () => {
    console.log("hey");
    this.props.reportStore!.unloadAllActiveReports();
  };
  private deleteAll = () => {
    deleteAllActiveReports(this.props.authStore!.userId, console.log);
  };
  private exit = () => {
    this.props.history.push("/");
  };

  public render() {
    const isEditedReport = this.props.reportStore!.activeReport !== null;
    return (
      <Menu>
        <ProMenuItem onClick={this.showLoadReportModal}>
          <div>Charger</div>
          <ProMenuIcon icon="download" />
        </ProMenuItem>
        <ProMenuItem disabled={!isEditedReport}>
          <div>Exporter</div>
          <ProMenuIcon icon="file-export" />
        </ProMenuItem>
        <ProMenuItem disabled={!isEditedReport}>
          <div>Importer</div>
          <ProMenuIcon icon="file-export" />
        </ProMenuItem>
        <ProMenuItem onClick={this.empty}>
          <div>Vider l'éditeur</div>
          <ProMenuIcon icon="trash" />
        </ProMenuItem>
        <ProMenuItem onClick={this.deleteAll}>
          <div>Supprimer les rapports</div>
          <ProMenuIcon icon="trash" />
        </ProMenuItem>
        <ProMenuItem onClick={this.exit}>
          <div>Quitter mode édition</div>
          <ProMenuIcon icon="door-open" />
        </ProMenuItem>
      </Menu>
    );
  }
}
export default withRouter(MainMenu);
