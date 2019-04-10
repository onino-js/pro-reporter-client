import * as React from "react";
import SubLayout from "../../../components/layouts/SubLayout";
import StepNavigation from "./StepNavigation";
import StepRoutes from "./StepRoutes";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { UiStore } from "../../../stores/ui.store";
import { EditorStore } from "../../../stores/editor.store";
import Step from "./Step";
import { withRouter, RouteComponentProps } from "react-router";
import { Flex } from "../../../components/ui/Flex";
import { ProContainer } from "../../../components/layouts/ProContainer";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class FormEdition extends React.Component<Props> {
  public state = {
    activeSectionIndex: 0,
  };

  public componentWillMount() {
    if (this.props.editorStore!.inputs.length === 0) {
      this.props.history.push("/editor/direct");
    }
  }

  private setActiveSectionIndex = (payload: number) =>
    this.setState({
      activeSectionIndex: payload,
    });

  public render() {
    const section = this.props.editorStore!.sections[
      this.state.activeSectionIndex
    ];
    const sectionId = section && section.id ? section.id : false;
    return (
      <Flex>
        {sectionId ? (
          <React.Fragment>
            <StepNavigation
              menuItems={this.props.editorStore!.sections}
              activeSectionIndex={this.state.activeSectionIndex}
              setActiveSectionIndex={this.setActiveSectionIndex}
            />
            {/* <FormEditionToolBar /> */}
            <ProContainer>
              <Step
                subsections={
                  this.props.editorStore!.sections[
                    this.state.activeSectionIndex
                  ].subsections
                }
                inputs={this.props.editorStore!.inputs.filter(
                  (input: any) => input.sectionId === sectionId,
                )}
              />
            </ProContainer>
          </React.Fragment>
        ) : (
          <p>Pas de rapport</p>
        )}
      </Flex>
    );
  }
}

export default withRouter(FormEdition);
