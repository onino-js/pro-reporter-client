import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { Dropdown, Icon } from "antd";
import styled from "../../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DuplicateModal from "./../editor-modals/DuplicateModal";
import { UiStore } from "../../../stores/ui.store";
import { Button } from "antd/lib/radio";
import { Flex } from "../../../components/ui/Flex";
import { _measures } from "../../../assets/styles/_measures";
import { FirebaseStore } from "../../../stores/firebaseStore";
import MainMenu from "./MainMenu";
import ReportMenu from "./ReportMenu";
import DisplayMenu from "./DisplayMenu";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  firebaseStore?: FirebaseStore;
}

const Container = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme.secondary};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
`;


const ActionLink = styled.span`
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
`;

const ProDropdown: any = styled(Dropdown).attrs({
  trigger: ["hover", "click"],
})`
  height: 100%;
  line-height: 40px;
`;

const SyncButtton = styled(Button)`
  border: none;
  outline: none;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.font_secondary};
  :hover {
    color: ${props => props.theme.primary};
  }
`;


const LeftWrapperPc = styled(Flex)`
  @media (max-width: ${_measures.mobile}px) {
    display: none;
  }
`;

const LeftWrapperMobile = styled(Flex)`
  padding-left: 10px;
  color: ${props => props.theme.bg_primary};
  @media (min-width: ${_measures.mobile}px) {
    display: none;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  firebaseStore: allStores.firebaseStore,
}))
@observer
class EditorToolbar extends React.Component<Props> {
  private synchronize = () => {
    this.props.firebaseStore!.synchronize();
  };

  public render() {
    return (
      <Container>
        <LeftWrapperPc>
          <ProDropdown overlay={<MainMenu />}>
            <ActionLink>
              Fichiers <Icon type="down" />
            </ActionLink>
          </ProDropdown>
          <ProDropdown overlay={<ReportMenu />}>
            <ActionLink>
              Rapport <Icon type="down" />
            </ActionLink>
          </ProDropdown>
          <ProDropdown overlay={<DisplayMenu />}>
            <ActionLink>
              Affichage <Icon type="down" />
            </ActionLink>
          </ProDropdown>
        </LeftWrapperPc>
        <LeftWrapperMobile>
          <FontAwesomeIcon icon="ellipsis-h" />
        </LeftWrapperMobile>
        <Flex alignH="flex-end" p="0px 5px 0px 0px">
          <SyncButtton onClick={this.synchronize}>SYNCHRONISER </SyncButtton>
        </Flex>
        <DuplicateModal />
      </Container>
    );
  }
}

export default withRouter(EditorToolbar);
