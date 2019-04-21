import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import {
  CancelButton,
  OkButton,
} from "../ui/Buttons";
import { _measures } from "../../assets/styles/_measures";

const DEFAULT_WIDTH = "70%";
const DEFAULT_HEIGHT = "100%";

interface Props {
  show: boolean;
  close: () => void;
  onOk?: () => void;
  headerTitle?: string;
  height?: [string, string];
  width?: [string, string];
}

const ModalHeader: any = styled.div`
  margin: 5px;
  padding: 0px;
  color: ${props => props.theme.secondary};
  font-weight: bolder;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  z-index: 200;
  @media (max-width: ${_measures.tablet}px) {
    font-size: 18px;
    height: 30px;
  }
`;

const ModalBody = styled.div`
  background-color: ${props => props.theme.bg_primary};
  flex: 1;
  height: auto;
  margin: 0px 5px;
  display: flex;
  /* flex-shrink: 0; */
  /* overflow-y: auto; */
`;

const ModalFooter = styled.div`
  color: white;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 5px;
`;

const CloseBox = styled.span`
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  /* @media (max-width: ${_measures.tablet}px) {
    width: 30px;
    height: 30px;
  } */
`;

const ModalContent: any = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${props => props.theme.bg_secondary};
  margin: auto;
  padding: 0px;
  max-height: 100vh;
  max-width: 100vw;
  /* border: 1px solid #888; */
  width: ${(props: any) => (props.width ? props.width[0] : DEFAULT_WIDTH)};
  height: ${(props: any) => (props.height ? props.height[0] : DEFAULT_HEIGHT)};
  /* max-width: 500px; */
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
  @media (max-width: ${_measures.tablet}px) {
    width: ${(props: any) => (props.width ? props.width[1] : "100%")};
    height: ${(props: any) => (props.height ? props.height[1] : "100%")};
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
  /* overflow: auto;  */
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
class ProModal extends React.Component<Props> {
  componentDidMount() {}
  public render() {
    return (
      <Modal show={this.props.show}>
        <ClickLayer onClick={this.props.close} />
        <ModalContent width={this.props.width} height={this.props.height}>
          <ModalHeader>
            <span>{this.props.headerTitle}</span>
            <CloseBox onClick={this.props.close}>&times;</CloseBox>
          </ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter>
            {this.props.close && (
              <CancelButton onClick={this.props.close}>FERMER</CancelButton>
            )}
            {this.props.onOk && (
              <OkButton onClick={this.props.onOk}>OK</OkButton>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export default ProModal;
