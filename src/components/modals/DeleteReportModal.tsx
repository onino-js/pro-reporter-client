import * as React from "react";
import { inject, observer } from "mobx-react";
import { Switch } from "antd";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import { TextDanger } from "../ui/Texts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProIcon } from "../ui/Icons";
import { Report } from "../../stores/report";
import ReportListItem from "../items/ReportListItem";

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
  height: 30px;
  margin: 10px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const ReportList = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-y: auto;
  /* margin: 5px 5px; */
`;

const AllChoiceText = styled.div`
  height: 100%;
  line-height: 30px;
  margin-right: 20px;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class DeleteReportModal extends React.Component<Props, State> {
  componentDidMount() {
    const templateId = this.props.reportStore!.template
      ? this.props.reportStore!.template!.id
      : null;
    // Get Ids of loaded reports
    let ids: string[] = this.props
      .reportStore!.reports.filter(report => report.templateId === templateId)
      .map(r => r.id);
    this.setState({ selectedIds: ids });
  }

  public state = {
    selectedIds: [],
  };

  private handleOk = () => {
    this.props.uiStore!.hideModal("delete-report");
    this.props.reportStore!.deleteReports(this.state.selectedIds);
  };
  private handleCancel = () => {
    this.props.uiStore!.hideModal("delete-report");
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

  private toggleAll = (reports: Report[]) => {
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

    // Get loaded reports
    const reports = this.props.reportStore!.reports.filter(
      report => report.templateId === templateId,
    );
    const isAll = this.state.selectedIds.length === reports.length;

    return (
      <ProModal
        show={this.props.uiStore!.showDeleteReportModal}
        close={this.handleCancel}
        onOk={this.handleOk}
        // headerTitle="Charger les rapports"
      >
        <ProContainer>
          <Title>Choisissez les rapports à supprimer</Title>
          <TextDanger align="center" w="100%" p="10px">
            <ProIcon icon="exclamation-triangle" scale={"big"} m="0px 10px" />
            Attention ! cette action supprimer définitivement les données
          </TextDanger>
          <Body>
            <ReportList>
              {reports.length !== 0 ? (
                <React.Fragment>
                  <AllChoice onClick={() => this.toggleAll(reports)}>
                    <AllChoiceText>Tous les rapports</AllChoiceText>
                    <Switch checked={isAll} />
                  </AllChoice>
                  {reports.map((report, index) => (
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
                  ))}
                </React.Fragment>
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

export default DeleteReportModal;
