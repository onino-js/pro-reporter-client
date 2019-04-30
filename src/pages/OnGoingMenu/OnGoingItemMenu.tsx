import * as React from "react";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UiStore } from "../../stores/ui.store";
import { RouteComponentProps, withRouter } from "react-router";
import { IreportJson } from "../../stores/report";

interface Props extends RouteComponentProps {
  reportId: string;
  uiStore?: UiStore;
  reportStore?: ReportStore;
  report?: IreportJson;
  deleteReport?: (id: string) => void;
}

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

@inject((allStores: AllStores, { reportId }) => ({
  uiStore: allStores.uiStore,
  report: allStores.reportStore.reportList.find(
    report => reportId === report.id,
  ),
  deleteReport: allStores.reportStore.deleteReport,
}))
@observer
class OnGoingItemMenu extends React.Component<Props> {
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
      <Dropdown overlay={actionMenu} trigger={["click"]}>
        <ActionWrapper>
          <FontAwesomeIcon icon="ellipsis-v" />
        </ActionWrapper>
      </Dropdown>
    );
  }
}

export default withRouter(OnGoingItemMenu);
