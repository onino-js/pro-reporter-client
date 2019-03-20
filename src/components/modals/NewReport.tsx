import * as React from "react";
import { inject, observer } from "mobx-react";
import { Input, Button, Modal } from "antd";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { mainTheme } from "../../assets/styles/_colors";

interface Props {
  uiStore?: UiStore;
  showNewReport?: boolean;
}

const Footer = styled.div`
  background-color: ${props => props.theme.bg_secondary};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
`;

const Title = styled.h2`
  color: ${props => props.theme.primary};
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.bg_secondary};
`;

const ModalBody = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.bg_primary};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalInput = styled(Input)`
  max-width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const OkButton = styled.button`
  background-color: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.font_secondary};
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.font_secondary};
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class NewReport extends React.Component<Props> {
  componentDidMount() {}
  // private setNewReference = (e: any) => {
  //   this.props.domainStore!.setNewReference(e.currentTarget.value);
  // };
  private createReport = () => {
    this.props.uiStore!.setState("showNewReport", false);
  };
  private handleCancel = () => {
    this.props.uiStore!.setState("showNewReport", false);
  };
  public render() {
    // const isReferenceValid = this.props.domainStore!.isReferenceValid;
    // const showMesage =
    //   !isReferenceValid && this.props.domainStore!.newReference !== "";
    return (
      <Modal
        visible={this.props.uiStore!.showNewReport}
        closable={false}
        bodyStyle={{
          backgroundColor: mainTheme.bg_secondary,
          padding: "5px",
          paddingBottom: 0,
        }}
        footer={null}
      >
        <ModalBody style={{ backgroundColor: mainTheme.bg_primary }}>
          <Title>Entrez la référence du projet</Title>
          <ModalInput />
        </ModalBody>
        <Footer>
          <CancelButton key="cancel-button" onClick={this.handleCancel}>
            ANNULER
          </CancelButton>
          <OkButton
            key="ok-button"
            type="primary"
            onClick={this.createReport}
            // disabled={!isReferenceValid}
          >
            OK
          </OkButton>
        </Footer>
      </Modal>
    );
  }
}

export default NewReport;
