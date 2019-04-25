import * as React from "react";
import { inject, observer } from "mobx-react";
import { Switch } from "antd";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";

interface Props {
  uiStore?: UiStore;
  reportStore?: ReportStore;
}
interface State {
  selectedIds: string[];
}

const Body = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.bg_primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Title = styled.h3`
  margin: 0px auto;
`;

const AllChoice = styled.div`
  width: 100%;
  max-width: 360px;
  height: 30px;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const ReportList = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-y: auto;
  /* margin: 5px 5px; */
`;

const ReportItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: 30px;
  width: 100%;
  margin: 5px auto;
  padding: 0px 5px;
  background-color: ${props => props.theme.disabled};
  cursor: pointer;
`;

const ReportId = styled.div`
  width: 200px;
  height: 100%;
  line-height: 30px;
  overflow: hidden;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class LoadReportModal extends React.Component<Props, State> {
  componentDidMount() {
    let ids: string[] = [];
    const templateId = this.props.reportStore!.template
      ? this.props.reportStore!.template!.id
      : null;
    this.props
      .reportStore!.reportList.filter(
        report => report.templateId === templateId,
      )
      .filter(
        report =>
          this.props.reportStore!.reports.find(r => r.id === report.id) ===
          undefined,
      )
      .forEach(r => ids.push(r.id));
    this.setState({ selectedIds: ids });
  }

  public state = {
    selectedIds: [],
  };
  // private setNewReference = (e: any) => {
  //   this.props.domainStore!.setNewReference(e.currentTarget.value);
  // };
  private handleOk = () => {
    this.props.reportStore!.loadReportListInEditor(this.state.selectedIds);
    this.props.uiStore!.hideModal("load-report");
  };
  private handleCancel = () => {
    this.props.uiStore!.hideModal("load-report");
  };

  private toggleItem = (id: string) => {
    const newIds: string[] = this.state.selectedIds.slice();
    //@ts-ignore
    const index = this.state.selectedIds.indexOf(id);
    if (index === -1) {
      newIds.push(id);
    } else {
      newIds.splice(index, 1);
    }
    this.setState({
      selectedIds: newIds,
    });
  };

  private toggleAll = (reports: any[]) => {
    let newIds: string[];
    if (reports.length === this.state.selectedIds.length) {
      newIds = [];
    } else {
      newIds = reports.map(r => r.id);
    }
    this.setState({
      selectedIds: newIds,
    });
  };

  public render() {
    const templateId = this.props.reportStore!.template
      ? this.props.reportStore!.template!.id
      : null;

    const reports = this.props
      .reportStore!.reportList.filter(
        report => report.templateId === templateId,
      )
      .filter(
        report =>
          this.props.reportStore!.reports.find(r => r.id === report.id) ===
          undefined,
      );

    const isAll = this.state.selectedIds.length === reports.length;
    // const isReferenceValid = this.props.domainStore!.isReferenceValid;
    // const showMesage =
    //   !isReferenceValid && this.props.domainStore!.newReference !== "";
    return (
      <ProModal
        show={this.props.uiStore!.showLoadReportModal}
        close={this.handleCancel}
        onOk={this.handleOk}
        headerTitle="Charger les rapports"
      >
        <ProContainer>
          <Title>Choisissez les rapports à charger</Title>
          <Body>
            {reports.length !== 0 && (
              <AllChoice onClick={() => this.toggleAll(reports)}>
                <ReportId>Tous les rapports</ReportId>
                <Switch checked={isAll} />
              </AllChoice>
            )}
            <ReportList>
              {reports.length !== 0 ? (
                reports.map((report, index) => (
                  <ReportItem
                    key={"load-report-item-" + index}
                    onClick={() => this.toggleItem(report.id)}
                  >
                    <ReportId>{report.id}</ReportId>
                    <Switch
                      //@ts-ignore
                      checked={this.state.selectedIds.includes(report.id)}
                    />
                  </ReportItem>
                ))
              ) : (
                <p>Pas de rapport à charger</p>
              )}
            </ReportList>
          </Body>
        </ProContainer>
      </ProModal>
    );
  }
}

export default LoadReportModal;
