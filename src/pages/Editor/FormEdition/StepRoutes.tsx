import * as React from "react";
import Step from "./Step";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { EditorStore } from "../../../stores/editor.store";

interface Props {
  editorStore?: EditorStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class StepRoutes extends React.Component<Props> {
  public render() {
    return (
      <React.Fragment>
        {this.props.editorStore!.sections.map((section: any, index: number) => (
          <Step
            subsections={section.subsections}
            inputs={this.props.editorStore!.inputs.filter(
              (input: any) => input.sectionId === section.id,
            )}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default StepRoutes;
