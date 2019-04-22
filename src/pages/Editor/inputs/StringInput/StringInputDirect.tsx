import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";
import styled from "../../../../styled-components";
import { ReportStore } from "../../../../stores/report.store";
import { _measures } from "../../../../assets/styles/_measures";
import InputLayoutDirect from "../layouts/InputLayoutDirect";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  reportStore?: ReportStore;
}

const InputContainer: any = styled.div`
  display: ${(props: any) => (props.visible ? "flex" : "none")};
  background-color: ${props => props.theme.bg_secondary};
  border-top: 5px solid ${props => props.theme.secondary};
  flex-direction: column;
  /* justify-content: space-between; */
  animation-name: animatetop;
  animation-duration: 0.4s;
  @keyframes animatetop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /* @media (max-width: ${_measures.tablet}px) {
    padding: 20px;
  }
  @media (max-width: 500px) {
    padding-top: 0px;
    padding-bottom: 10px;
  } */
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  reportStore: allStores.reportStore,
}))
@observer
class StringInputDirect extends React.Component<Props> {
  private setValue = (e: any) => {
    this.props.input.setValue(e.currentTarget.value);
  };
  public onOk = () => {
    this.props.input.confirmValue();
    this.props.uiStore!.setIsInputModalOpen(false);
    this.props.reportStore!.renderInput({
      id: this.props.input.id,
      type: this.props.input.type,
      value: this.props.input.value,
    });
    this.props.reportStore!.fieldHighlighted &&
      this.props.reportStore!.renderContainers();
  };
  public onCancel = () => {
    this.props.input.retsoreValue();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  public onRefresh = () => {
    this.props.input.reset();
  };
  public render() {
    return (
      <InputContainer
        close={this.onCancel}
        visible={this.props.uiStore!.isInputModalOpen}
      >
        <InputLayoutDirect
          label={this.props.input!.label}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onRefresh={this.onRefresh}
          status={this.props.input!.status}
        >
          <InputPrimitive
            type="text"
            value={this.props.input!.value}
            onChange={this.setValue}
          />
        </InputLayoutDirect>
      </InputContainer>
    );
  }
}

export default StringInputDirect;
