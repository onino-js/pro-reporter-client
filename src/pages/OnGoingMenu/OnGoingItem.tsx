import * as React from "react";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Dropdown, Menu } from "antd";
import { formatDate } from "../../services/app.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UiStore } from "../../stores/ui.store";
import { StatusButton } from "../../components/ui/Buttons";
import { _measures } from "../../assets/styles/_measures";
import { RouteComponentProps, withRouter } from "react-router";
import { IreportJson } from "../../stores/report";

interface Props extends RouteComponentProps {
  reportId: string;
  uiStore?: UiStore;
  reportStore?: ReportStore;
  report?: IreportJson;
  deleteReport?: (id: string) => void;
}

const Container = styled.div`
  display : flex;
  height: 50px;
  background-color: ${props => props.theme.disabled};
  margin-top: 5px;
  width: 100%;
  /* :hover {
    border: 1px solid ${props => props.theme.secondary};
  } */
`;

const MenuIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1em;
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionWrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* margin-right: 10px; */
`;

const DateCol = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  font-size: 10px;
  margin-left: 20px;
  @media (max-width: ${_measures.mobile}px) {
    width: 70px;
    margin-left: 10px;
  }
`;
const TemplateNameCol = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  line-height: 100%;
`;
const StatusCol = styled.div`
  display: flex;
  width: 40px;
  align-items: center;
`;
const ActionCol = styled.div`
  display: flex;
  width: 40px;
  align-items: center;
`;

@inject((allStores: AllStores, { reportId }) => ({
  uiStore: allStores.uiStore,
  report: allStores.reportStore.reportList.find(
    report => reportId === report.id,
  ),
  deleteReport: allStores.reportStore.deleteReport,
}))
@observer
class OnGoingItem extends React.Component<Props> {
  private delete = () => {
    this.props.deleteReport!(this.props.reportId);
  };
  private archive = () => {
    this.props.deleteReport!(this.props.reportId);
  };
  private edit = () => {
    this.props.history.push(`editor/${this.props.reportId}`);
  };
  public render() {
    const report = this.props.report!;
    const actionMenu = (
      <Menu>
        <MenuItem onClick={this.edit}>
          Editer <MenuIcon icon="edit" />
        </MenuItem>
        <MenuItem onClick={this.archive}>
          Archiver <MenuIcon icon="archive" />
        </MenuItem>
        <MenuItem onClick={this.delete}>
          Supprimer <MenuIcon icon="trash" />
        </MenuItem>
      </Menu>
    );
    return (
      <Container>
        <DateCol>{formatDate(report.lastModifiedDate)}</DateCol>
        <TemplateNameCol style={{ overflow: "hidden" }}>
          {report.templateName}
        </TemplateNameCol>
        <StatusCol>
          <StatusButton status={report.status} />
        </StatusCol>
        <ActionCol>
          <Dropdown overlay={actionMenu} trigger={["click"]}>
            <ActionWrapper>
              <FontAwesomeIcon icon="ellipsis-v" />
            </ActionWrapper>
          </Dropdown>
        </ActionCol>
      </Container>
    );
  }
}

export default withRouter(OnGoingItem);
