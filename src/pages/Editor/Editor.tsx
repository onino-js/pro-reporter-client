import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { UiStore } from "../../stores/ui.store";
import { Report } from "../../stores/report";
import { Route, withRouter, RouteComponentProps } from "react-router";
import FormEdition from "./FormEdition/FormEdition";
import EditorToolbar from "./EditorToolbar";
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
    // get back template
  }

  public render() {
    const isDirectMode = this.props.location.pathname === "/editor/direct";
    const reports = this.props.reportStore!.reports;
    const activeReport = this.props.reportStore!.activeReport;
    const template = this.props.reportStore!.template;
    const reportsLoaded = reports.length !== 0;
    return (
      <MainLayout>
        <SubLayout
          p="0px"
          sideContent={
            <EditorSidebar
              clickBehaviour={isDirectMode ? "highlight" : "scroll"}
            />
          }
        >
          <Flex dir="c" flex={1}>
            {template && <EditorToolbar />}
            {!template ? (
              <NoTemplate />
            ) : !activeReport ? (
              <NoReport />
            ) : (
              <React.Fragment>
                <Route exact path="/editor" component={Preview} />
                <Route path="/editor/form" component={FormEdition} />
                <Route path="/editor/direct" component={Preview} />
              </React.Fragment>
            )}
            {template && <EditorTabs />}
          </Flex>
          <LoadingModal
            show={this.props.uiStore!.showLoadingModal}
            message="Création des nouveax rapports en cours, veuillez patienter"
          />
        </SubLayout>
      </MainLayout>
    );
  }
}

export default withRouter(Editor);
