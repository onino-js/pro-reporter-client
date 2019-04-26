import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { Report } from "../../../stores/report";
import { Menu } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../../stores/report.store";
import {
  createProcess,
} from "../../../services/cloud-converter.service";
import { saveAs } from "file-saver";
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
class ReportMenu extends React.Component<Props> {
  
  private reset = () => this.props.reportStore!.reset();
  private deleteReport = () =>
    this.props.reportStore!.delete(this.props.Report!.id);

  private duplicate = () => this.props.reportStore!.duplicate();

  private exportReportSvg = async () => {
    const svg = this.props.reportStore!.getSvg();
    var blob = new Blob([svg], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "test.svg");
  };

  private exportReportPdf = async () => {
    const svg = this.props.reportStore!.getSvg();
    // const res = await startConvertion(svg);
    const res = await createProcess();
    res && console.log(res);
    // const res2 = await startProcess(res.url, svg)
    // console.log(res2)
  };

  private customDuplicateRequest = () =>
    this.props.uiStore!.showModal("duplicate");


  public render() {
    const isEditedReport = this.props.reportStore!.activeReport !== null;
    return (
      <Menu>
        <ProMenuItem onClick={this.duplicate} disabled={!isEditedReport}>
          <div>Dupliquer le rapport</div>
          <ProMenuIcon icon="clone" />
        </ProMenuItem>
        <ProMenuItem
          onClick={this.customDuplicateRequest}
          disabled={!isEditedReport}
        >
          <div>Dupliquer custom</div>
          <ProMenuIcon icon="clone" />
        </ProMenuItem>
        <ProMenuItem disabled={!isEditedReport}>
          <div>Cloner les champs</div>
        </ProMenuItem>
        <ProMenuItem onClick={this.exportReportSvg} disabled={!isEditedReport}>
          <div>Exporter svg</div>
          <ProMenuIcon icon="file-export" />
        </ProMenuItem>
        <ProMenuItem onClick={this.exportReportPdf} disabled={!isEditedReport}>
          <div>Exporter pdf</div>
          <ProMenuIcon icon="file-export" />
        </ProMenuItem>
        <ProMenuItem onClick={this.deleteReport} disabled={!isEditedReport}>
          <div>Supprimer</div>
          <ProMenuIcon icon="trash" />
        </ProMenuItem>

        <ProMenuItem onClick={this.reset}>
          <div>Vider les champs</div>
        </ProMenuItem>
      </Menu>
    );
  }
}

export default withRouter(ReportMenu);
