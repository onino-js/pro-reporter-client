import * as React from "react";
import { inject, observer } from "mobx-react";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { mainTheme } from "../../assets/styles/_colors";
import { CancelButton } from "../../pages/Editor/inputs/layouts/EditorButtons";

interface Props {
  show: boolean;
  close: () => void;
}

const ModalHeader: any = styled.div`
  padding: 0px 16px;
  margin: 10px 0px;
  color: ${props => props.theme.secondary};
  font-weight: bolder;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

const ModalBody = styled.div`
  background-color: ${props => props.theme.bg_primary};
  min-height: 400px;
  margin: 0px 10px;
  padding: 20px;
`;

const ModalFooter = styled.div`
  /* padding: 0px 16px; */
  color: white;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  /* height: 40px; */
  margin: 10px 0px;
`;

const CloseBox = styled.span`
  width: 4opx;
  height: 40px;
  cursor: pointer;
  text-align: center;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: ${props => props.theme.bg_secondary};
  margin: auto;
  padding: 0px;
  /* border: 1px solid #888; */
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

const Modal: any = styled.div`
  display: ${(props: any) =>
    props.show ? "flex" : "none"}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ClickLayer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class InfoModal extends React.Component<Props> {
  componentDidMount() {}
  public render() {
    return (
      <Modal show={this.props.show}>
        <ClickLayer onClick={this.props.close} />
        <ModalContent>
          <ModalHeader>
            <span>A propos</span>
            <CloseBox onClick={this.props.close}>&times;</CloseBox>
          </ModalHeader>
          <ModalBody>
            <p>Ceci est une version de démonstration </p>
            <p>
              PROREPORTER est un logiciel développé par la société ONINO.JS.
            </p>
          </ModalBody>
          <ModalFooter>
            <CancelButton onClick={this.props.close}>FERMER</CancelButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export default InfoModal;
