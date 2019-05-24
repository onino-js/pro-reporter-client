import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { UiStore } from "../../stores/ui.store";
import { withRouter, RouteComponentProps } from "react-router";
import FormEdition from "./FormEdition/FormEdition";
import EditorToolbar from "./EditorToolbar/EditorToolbar";
import Preview from "./Preview/Preview";
import { Flex } from "../../components/ui/Flex";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import EditorTabs from "./EditorTabs";
import { ReportStore } from "../../stores/report.store";
import { NoReport } from "./NoReport";
import LoadingModal from "../../components/modals/LoadingModal";
import SubLayout from "../../components/layouts/SubLayout";
import EditorSidebar from "./EditorSidebar";
import { NoTemplate } from "./NoTemplate";
import LoadReportModal from "../../components/modals/LoadReportModal";
import SyncModal from "../../components/modals/SyncModal";
import DeleteReportModal from "../../components/modals/DeleteReportModal";
import EditorStatusBar from "./EditorStatusBar/EditorStatusBar";
import InputDescriptionModal from "../../components/modals/InputDescriptionModal";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  reportStore?: ReportStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class Editor extends React.Component<Props> {
  componentWillMount() {
    if (!this.props.uiStore!.loadingState["reports"]) {
      this.props.history.push("/on-going");
    }
    const params: any = this.props.match.params;
    if (params.reportId) {
      this.props.reportStore!.loadReportInEditorFromId(params.reportId);
      this.props.reportStore!.setActiveReport(params.reportId);
    }
  }

  public render() {
    const reports = this.props.reportStore!.reports;
    const activeReport = this.props.reportStore!.activeReport;
    const template = this.props.reportStore!.template;
    const reportsLoaded = reports.length !== 0;
    const editionMode = this.props.reportStore!.editionMode;
    // Set active report when
    if (!activeReport && !!template) {
      const rIndex = reports.findIndex(r => r.templateId === template.id);
      if (rIndex !== -1) {
        window.setTimeout(
          () => this.props.reportStore!.setActiveReport(reports[rIndex].id),
          100,
        );
      }
    }
    return (
      <MainLayout>
        <SubLayout p="0px" sideContent={<EditorSidebar />}>
          <Flex dir="c" flex={1}>
            {template && <EditorToolbar isEditedReport={!!activeReport} />}
            {activeReport && <EditorStatusBar />}
            {!template ? (
              <NoTemplate />
            ) : !activeReport ? (
              <NoReport />
            ) : (
              <React.Fragment>
                {editionMode === "direct" && <Preview />}
                {editionMode === "form" && <FormEdition />}
              </React.Fragment>
            )}
            {template && <EditorTabs template={template} />}
          </Flex>
          <LoadReportModal />
          <DeleteReportModal />
          <SyncModal />
          <LoadingModal
            show={this.props.uiStore!.showLoadingModal}
            message="Création des nouveax rapports en cours, veuillez patienter"
          />
          <InputDescriptionModal />
          {/* <LoadingModal
            show={true}
            message="Création des nouveax rapports en cours, veuillez patienter"
          /> */}
        </SubLayout>
      </MainLayout>
    );
  }
}

export default withRouter(Editor);
