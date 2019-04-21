import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { InputPrimitive } from "../layouts/InputPrimitive";
import { UiStore } from "../../../../stores/ui.store";

import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Col, Row } from "antd";
import { ReportStore } from "../../../../stores/report.store";
import { _measures } from "../../../../assets/styles/_measures";
import { CancelButton, OkButton } from "../../../../components/ui/Buttons";

interface Props {
  uiStore?: UiStore;
  inputId: string;
  input?: any;
  reportStore?: ReportStore;
}

const InputContainer: any = styled.div`
  display: ${(props: any) => (props.visible ? "flex" : "none")};
  background-color: ${props => props.theme.bg_secondary};
  /* min-height: 400px; */
  border-top: 5px solid ${props => props.theme.secondary};
  padding: 30px;
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
  @media (max-width: 500px) {
    padding-top: 0px;
    padding-bottom: 10px;
  }
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
  public render() {
    return (
      <InputContainer
        close={this.onCancel}
        visible={this.props.uiStore!.isInputModalOpen}
      >
        <Row type="flex">
          <Col xl={16} md={16} xs={24}>
            <InputLayoutStandard input={this.props.input}>
              <InputPrimitive
                type="text"
                value={this.props.input!.value}
                onChange={this.setValue}
              />
            </InputLayoutStandard>
          </Col>
          <Col
            xl={8}
            md={8}
            xs={24}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <CancelButton onClick={this.onCancel}> ANNULER </CancelButton>
            <OkButton onClick={this.onOk}>CONFIRMER</OkButton>
          </Col>
        </Row>
      </InputContainer>
    );
  }
}

export default StringInputDirect;
