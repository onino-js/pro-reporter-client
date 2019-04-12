import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { UiStore } from "../../stores/ui.store";
import { EditorStore } from "../../stores/editor.store";
import { RouteChildrenProps, Route } from "react-router";
import FormEdition from "./FormEdition/FormEdition";
import EditorToolbar from "./EditorToolbar";
import Preview from "./Preview/Preview";
import { Flex } from "../../components/ui/Flex";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import EditorTabs from "./EditorTabs";
import { ReportStore } from "../../stores/report.store";
import { NoReport } from "./NoReport";

interface Props extends RouteChildrenProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
  reportStore?: ReportStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
  reportStore: allStores.reportStore,
}))
@observer
class Editor extends React.Component<Props> {
  componentDidMount() {
    // get back template
  }
  public render() {
    const reports = this.props.reportStore!.reports;
    return (
      <MainLayout>
        <Flex dir="c">
          <EditorToolbar />
          {reports.length !== 0 ? (
            <React.Fragment>
              <Route exact path="/editor" component={Preview} />
              <Route path="/editor/form" component={FormEdition} />
              <Route path="/editor/direct" component={Preview} />
            </React.Fragment>
          ) : (
            <NoReport />
          )}
          <EditorTabs />
        </Flex>
      </MainLayout>
    );
  }
}

export default Editor;
