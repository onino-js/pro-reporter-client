import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { Report } from "../../../stores/report";
import { Menu } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../../stores/report.store";
import { UiStore } from "../../../stores/ui.store";
import { AuthStore } from "../../../stores/auth.store";
import { FirebaseStore } from "../../../stores/firebaseStore";
import { ProMenuItem, ProMenuIcon } from "../../../components/ui/Buttons";

interface Props extends RouteComponentProps {
  Report?: Report;
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
class DisplayMenu extends React.Component<Props> {
  private formEditionMode = () => {
    this.props.reportStore!.setEditionMode("form");
  };
  private templateEditionMode = () => {
    this.props.reportStore!.setEditionMode("direct");
  };
  private zoomIn = () => this.props.reportStore!.zoomIn();
  private zoomOut = () => this.props.reportStore!.zoomOut();

  private hightlight = () => {
    if (this.props.reportStore!.fieldHighlighted) {
      this.props.reportStore!.setFieldHighlighted(false);
      this.props.reportStore!.hideInputs();
    } else {
      this.props.reportStore!.setFieldHighlighted(true);
      this.props.reportStore!.renderContainers();
    }
  };

  public render() {
    const editionMode = this.props.reportStore!.editionMode;
    const isEditedReport = this.props.reportStore!.activeReport !== null;
    return (
      <Menu>
        {editionMode === "direct" && (
          <ProMenuItem onClick={this.formEditionMode}>
            <div>Mode formulaire</div>
          </ProMenuItem>
        )}
        {editionMode === "form" && (
          <ProMenuItem onClick={this.templateEditionMode}>
            <div>Mode template</div>
          </ProMenuItem>
        )}
        {editionMode === "direct" && (
          <ProMenuItem onClick={this.hightlight} disabled={!isEditedReport}>
            {this.props.reportStore!.fieldHighlighted ? "Masquer" : "Montrer"}{" "}
            les champs
            <ProMenuIcon
              icon={
                !this.props.reportStore!.fieldHighlighted ? "eye" : "eye-slash"
              }
            />
          </ProMenuItem>
        )}
        {editionMode === "direct" && (
          <ProMenuItem onClick={this.zoomIn}>
            Zoom in
            <ProMenuIcon icon="plus" />
          </ProMenuItem>
        )}
        {editionMode === "direct" && (
          <ProMenuItem onClick={this.zoomOut}>
            Zoom out
            <ProMenuIcon icon="minus" />
          </ProMenuItem>
        )}
      </Menu>
    );
  }
}

export default withRouter(DisplayMenu);
