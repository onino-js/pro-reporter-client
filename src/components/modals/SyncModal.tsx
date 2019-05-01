import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import { UiStore } from "../../stores/ui.store";
import { FirebaseStore } from "../../stores/firebaseStore";
import { SpiralSpinner } from "react-spinners-kit";
import { Flex } from "../ui/Flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../styled-components";
import { mainTheme } from "../../assets/styles/_colors";

interface Props {
  uiStore?: UiStore;
  show?: boolean;
  firebaseStore?: FirebaseStore;
}

const Title = styled.h3`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CheckBox = styled.div`
  margin: 10px auto;
`;

const Check = styled(FontAwesomeIcon).attrs({
  icon: "check",
})`
  font-size: 3em;
  color: ${props => props.theme.success};
`;

const Times = styled(FontAwesomeIcon).attrs({
  icon: "times",
})`
  font-size: 3em;
  color: ${props => props.theme.danger};
`;

const SmallCheck = styled(Check)`
  font-size: 1em;
`;

const SyncWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  overflow-y: auto;
`;

const SyncItemBox = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  margin: 5px 10px;
`;

const SyncItem = styled.div`
  display: flex;
  width: 200px;
  overflow: hidden;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  firebaseStore: allStores.firebaseStore,
  show: allStores.uiStore.showSyncModal,
}))
@observer
class SyncModal extends React.Component<Props> {
  componentDidMount() {}

  onOk = () => {
    this.props.uiStore!.hideModal("sync");
  };
  close = () => {
    this.props.uiStore!.hideModal("sync");
  };
  public render() {
    const status = this.props.firebaseStore!.syncStatus;
    const syncList = this.props.firebaseStore!.syncList;
    return (
      <ProModal show={this.props.show!} close={this.close}>
        <ProContainer>
          <Flex dir="c" alignH="center" scrollY="auto" flex="1">
            {status === "ongoing" && <Title>Synchronization en cours </Title>}
            {status === "done" && <Title>Synchronization terminée </Title>}
            {status === "error" && <Title> Problème de connexion </Title>}
            <CheckBox>
              {status === "ongoing" && (
                <SpiralSpinner
                  size={100}
                  frontColor={mainTheme.secondary}
                  loading={true}
                />
              )}
              {status === "done" && <Check />}
              {status === "error" && <Times />}
            </CheckBox>
            <SyncWrapper>
              {syncList.map((syncItem: string, index) => (
                <SyncItemBox key={`sync-item-${index}`}>
                  <SyncItem>{syncItem}</SyncItem>
                  <SmallCheck />
                </SyncItemBox>
              ))}
            </SyncWrapper>
          </Flex>
        </ProContainer>
      </ProModal>
    );
  }
}

export default SyncModal;
