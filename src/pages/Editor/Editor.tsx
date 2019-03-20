import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import StepNavigation from "./StepNavigation";
import StepRoutes from "./StepRoutes";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import { EditorStore } from "../../stores/editor.store";
import Step from "./Step";
import { RouteChildrenProps } from "react-router";
import EditorToolbar from "./EditorToolbar";

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
  public state = {
    activeSectionIndex: 0,
  };

  private setActiveSectionIndex = (payload: number) =>
    this.setState({
      activeSectionIndex: payload,
    });

  public render() {
    const sectionId = this.props.editorStore!.sections[
      this.state.activeSectionIndex
    ].id;
    return (
      <MainLayout>
        <SubLayout
          activePage="editor"
          sideContent={
            <StepNavigation
              menuItems={this.props.editorStore!.sections}
              activeSectionIndex={this.state.activeSectionIndex}
              setActiveSectionIndex={this.setActiveSectionIndex}
            />
          }
          toolbar={<EditorToolbar />}
        >
          <React.Fragment>
            <Step
              subSections={
                this.props.editorStore!.sections[this.state.activeSectionIndex]
                  .subSections
              }
              inputs={this.props.editorStore!.inputs.filter(
                (input: any) => input.sectionId === sectionId,
              )}
            />
          </React.Fragment>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default Editor;
