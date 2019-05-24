import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { UiStore } from "../../../../stores/ui.store";

import styled from "../../../../styled-components";
import SingleSignatureEditor from "./SingleSignatureEditor";
import { ReportStore } from "../../../../stores/report.store";
import { ActionButton } from "../../../../components/ui/Buttons";
import InputLayoutDirect from "../layouts/InputLayoutDirect";
import { InputContainer } from "../../../../components/layouts/InputContainer";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  reportStore?: ReportStore;
}

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  max-width: 150px;
  max-height: 100px;
  height: auto;
  cursor: pointer;
  background-color: white;
`;

const MiddleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  reportStore: allStores.reportStore,
}))
@observer
class SingleSignatureDirect extends React.Component<Props> {
  // componentDidMount() {
  //   this.props.input.initialize();
  // }
  // componentWillUnmount() {
  //   this.props.input.setData();
  // }
  private openModal = () => {
    this.props.input.setIsEditVisible(true);
    window.setTimeout(() => this.props.input!.canvasStore.resizeCanvas(), 200);
  };

  private onEditorCancel = () => {
    this.props.input.restore();
    this.props.input.setIsEditVisible(false);
  };
  private onEditorOk = () => {
    this.props.input.validateCanvas();
    this.props.input.setIsEditVisible(false);
  };
  public onOk = () => {
    this.props.input.confirmValue();
    this.props.uiStore!.setIsInputModalOpen(false);
    this.props.reportStore!.renderInput({
      id: this.props.input.id,
      type: this.props.input.inputRef.type,
      value: this.props.input.value,
    });
  };
  public onCancel = () => {
    this.props.input.retsoreValue();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  public onRefresh = () => {
    this.props.input!.reset();
  };
  public render() {
    return (
      <React.Fragment>
        <InputContainer
          close={this.onCancel}
          visible={this.props.uiStore!.isInputModalOpen}
        >
          <InputLayoutDirect
            label={this.props.input!.inputRef.label}
            onOk={this.onOk}
            onCancel={this.onCancel}
            onRefresh={this.onRefresh}
            status={this.props.input!.status}
            input={this.props.input}
          >
            <MiddleRow>
              {this.props.input.value !== "" ? (
                <Img onClick={this.openModal} src={this.props.input.value} />
              ) : (
                <ActionButton icon="edit" size="big" onClick={this.openModal} />
              )}
            </MiddleRow>
          </InputLayoutDirect>
        </InputContainer>

        <SingleSignatureEditor
          show={this.props.input.isEditVisible}
          input={this.props.input}
          onOk={this.onEditorOk}
          onCancel={this.onEditorCancel}
        />
      </React.Fragment>
    );
  }
}

export default SingleSignatureDirect;
