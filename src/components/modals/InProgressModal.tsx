import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import pageInProgress from "./../../assets/images/page-in-progess.jpg";
import styled from "../../styled-components";
import { Flex } from "../ui/Flex";
import { UiStore } from "../../stores/ui.store";

interface Props {
  uiStore?: UiStore;
}

const Img = styled.img`
  height: 100px;
  width: auto;
  margin: 40px auto 40px auto;
`;

const Text = styled.p`
  margin: 0px auto;
  text-align: center;
  max-width: 500px;
  font-size: 24px;
`;
const Text2 = styled.p`
  margin: 0px auto;
  text-align: center;
  max-width: 500px;
  font-size: 14px;
  margin-top: 20px;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class InProgressModal extends React.Component<Props> {
  private close = () => {
    this.props.uiStore!.hideModal("in-progress");
  };
  public render() {
    return (
      <ProModal
        show={this.props.uiStore!.showInProgressModal}
        close={this.close}
        headerTitle={"Oups !"}
        width={["50%", "100%"]}
        height={["auto", "auto"]}
      >
        <ProContainer>
          <Flex dir="c" alignH="center" alignV="center">
            <Img src={pageInProgress} />
            <Text>Cette fonctionnalité n'est pas terminée</Text>
            <Text2>
              Avec la page contact, vous pourrez facilement partager des
              documents avec tous vos contacts
            </Text2>
          </Flex>
        </ProContainer>
      </ProModal>
    );
  }
}

export default InProgressModal;
