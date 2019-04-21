import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { UiStore } from "../../../../stores/ui.store";

import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Col } from "antd";
import SingleSignatureEditor from "./SingleSignatureEditor";
import { _measures } from "../../../../assets/styles/_measures";
import { ReportStore } from "../../../../stores/report.store";
import {
  ActionButton,
  CancelButton,
  OkButton,
} from "../../../../components/ui/Buttons";

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
  padding: 50px;
  flex-direction: column;
  justify-content: space-between;
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
  @media (max-width: ${_measures.tablet}px) {
    padding: 20px;
  }
`;

const Img = styled.img`
  border: 6px solid ${props => props.theme.disabled};
  max-width: 90%;
  height: auto;
  cursor: pointer;
  background-color: white;
`;

const UpperRow = styled.div`
  width: 100%;
  display: flex;
`;

const MiddleRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
      type: this.props.input.type,
      value: this.props.input.value,
    });
  };
  public onCancel = () => {
    this.props.input.retsoreValue();
    this.props.uiStore!.setIsInputModalOpen(false);
  };
  public render() {
    return (
      <React.Fragment>
        <InputContainer
          close={this.onCancel}
          visible={this.props.uiStore!.isInputModalOpen}
        >
          <UpperRow>
            <Col xl={24} xs={24}>
              <InputLayoutStandard input={this.props.input}>
                <ActionButton
                  icon="edit"
                  active={true}
                  onClick={this.openModal}
                />
              </InputLayoutStandard>
            </Col>
          </UpperRow>
          <MiddleRow>
            <Col xl={24} xs={24}>
              <Col xl={8} xs={8}>
                {this.props.input.value !== "" ? (
                  <Img src={this.props.input.value} />
                ) : (
                  <p>Pas d'aperçu disponible</p>
                )}
              </Col>
            </Col>
          </MiddleRow>
          <BottomRow>
            <CancelButton onClick={this.onCancel}> ANNULER </CancelButton>
            <OkButton onClick={this.onOk}>CONFIRMER</OkButton>
          </BottomRow>
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
