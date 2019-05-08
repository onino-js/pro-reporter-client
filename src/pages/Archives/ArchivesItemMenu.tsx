import * as React from "react";
import styled from "../../styled-components";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UiStore } from "../../stores/ui.store";
import { RouteComponentProps, withRouter } from "react-router";
import { IreportJson } from "../../stores/report";
import { ArchiveStore } from "../../stores/archive.store";

interface Props extends RouteComponentProps {
  reportId: string;
  uiStore?: UiStore;
  archiveStore?: ArchiveStore;
  report?: IreportJson;
  deleteArchive?: (id: string) => void;
  resurectArchive?: (id: string) => void;
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
  report: allStores.archiveStore.archiveList.find(
    report => reportId === report.id,
  ),
  deleteArchive: allStores.archiveStore.deleteArchive,
  resurectArchive: allStores.archiveStore.resurectArchive,
}))
@observer
class ArchivesItemMenu extends React.Component<Props> {
  private delete = () => {
    this.props.deleteArchive!(this.props.reportId);
  };
  private resurect = () => {
    this.props.resurectArchive!(this.props.reportId);
  };
  public render() {
    const actionMenu = (
      <Menu>
        <MenuItem onClick={this.resurect}>
          Déterrer <MenuIcon icon="archive" />
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

export default withRouter(ArchivesItemMenu);
