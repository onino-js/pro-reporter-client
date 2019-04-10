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

interface Props extends RouteChildrenProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class Editor extends React.Component<Props> {
  componentDidMount() {
    // get back template
  }
  public render() {
    return (
      <MainLayout>
        <Flex dir="c">
          <EditorToolbar />
          <Route exact path="/editor" component={Preview} />
          <Route path="/editor/form" component={FormEdition} />
          <Route path="/editor/direct" component={Preview} />
        </Flex>
      </MainLayout>
    );
  }
}

export default Editor;
