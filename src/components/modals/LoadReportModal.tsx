import * as React from "react";
import { inject, observer } from "mobx-react";
import { Switch } from "antd";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import ReportListItem from "../items/ReportListItem";
import { ReportFilterStatusButton } from "../items/ReportFilterStatusButton";
import { Istatus } from "../../models/app.models";
import { IreportJson } from "../../stores/report";
import { ActionButton } from "../ui/Buttons";

interface Props {
  uiStore?: UiStore;
  reportStore?: ReportStore;
}

interface State {
  selectedIds: string[];
  selectedStatus: Istatus | null;
}

const Body = styled.div`
  background-color: ${props => props.theme.bg_primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 500px;
  min-width: 300px;
  margin: 10px auto;
`;

const Title = styled.h3`
  margin: 0px auto;
`;

const AllChoice = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const ReportList = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  /* margin: 5px 5px; */
`;

const AllChoiceText = styled.div`
  height: 100%;
  line-height: 30px;
  margin-right: 20px;
`;

const FilterBox = styled.div`
  display: flex;
  width: 100%;
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
    selectedStatus: null,
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

  private toggleAll = (reports: IreportJson[]) => {
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

  private filterStatus = (status: Istatus | null) => {
    this.setState({ selectedStatus: status, selectedIds: [] });
  };

  public render() {
    const templateId = this.props.reportStore!.template
      ? this.props.reportStore!.template!.id
      : null;

    // Get unload reports
    const reports = this.props
      .reportStore!.reportList.filter(
        report => report.templateId === templateId,
      )

      // Filter report unloaded
      .filter(
        report =>
          this.props.reportStore!.reports.find(r => r.id === report.id) ===
          undefined,
      )
      // Filter status if selectedStatus is not null
      .filter(
        r =>
          r.status === this.state.selectedStatus ||
          this.state.selectedStatus === null,
      );

    const isAll = this.state.selectedIds.length === reports.length;
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
            <FilterBox>
              <ReportFilterStatusButton
                selectedStatus={this.state.selectedStatus}
                filterStatus={this.filterStatus}
              />
              <ActionButton
                title="Plus de filtres"
                size="big"
                icon="plus"
                m="0px 10px"
              />
            </FilterBox>

            {reports.length !== 0 && (
              <AllChoice onClick={() => this.toggleAll(reports)}>
                <AllChoiceText>Tous les rapports</AllChoiceText>
                <Switch checked={isAll} />
              </AllChoice>
            )}
            <ReportList>
              {reports.length !== 0 ? (
                reports.map((report, index) => (
                  <ReportListItem
                    key={"load-report-item-" + index}
                    onClick={() => this.toggleItem(report.id)}
                    report={report}
                    actionMenu={
                      <Switch
                        size="small"
                        //@ts-ignore
                        checked={this.state.selectedIds.includes(report.id)}
                      />
                    }
                  />
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
