import * as React from "react";
import { inject, observer } from "mobx-react";
import { Modal } from "antd";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { mainTheme } from "../../assets/styles/_colors";
import { ReportStore } from "../../stores/report.store";

interface Props {
  uiStore?: UiStore;
  reportStore? : ReportStore
}

const Footer = styled.div`
  background-color: ${props => props.theme.bg_secondary};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
`;

const ModalBody = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.bg_primary};
  display: flex;
  flex-direction: column;
  align-items: center;
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
  reportStore: allStores.reportStore,
}))
@observer
class LoadReportModal extends React.Component<Props> {
  componentDidMount() {}
  // private setNewReference = (e: any) => {
  //   this.props.domainStore!.setNewReference(e.currentTarget.value);
  // };
  private handleOk = () => {
    this.props.reportStore!.loadReportListInEditor();
    this.props.uiStore!.hideModal("load-report");
  };
  private handleCancel = () => {
    this.props.uiStore!.hideModal("load-report");
  };
  public render() {
    // const isReferenceValid = this.props.domainStore!.isReferenceValid;
    // const showMesage =
    //   !isReferenceValid && this.props.domainStore!.newReference !== "";
    return (
      <Modal
        visible={this.props.uiStore!.showLoadReportModal}
        closable={false}
        bodyStyle={{
          backgroundColor: mainTheme.bg_secondary,
          padding: "5px",
          paddingBottom: 0,
        }}
        footer={null}
      >
        <ModalBody style={{ backgroundColor: mainTheme.bg_primary }} />
        <Footer>
          <CancelButton key="cancel-button" onClick={this.handleCancel}>
            ANNULER
          </CancelButton>
          <OkButton key="ok-button" type="primary" onClick={this.handleOk}>
            OK
          </OkButton>
        </Footer>
      </Modal>
    );
  }
}

export default LoadReportModal;
