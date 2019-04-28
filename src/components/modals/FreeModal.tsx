import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";

interface Props {
  show: boolean;
  style?: React.CSSProperties;
  close: () => void;
}

const Modal = styled.div<{show:boolean}>`
  display: ${(props: { show: boolean }) =>
    props.show ? "flex" : "none"}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 5px;
  border: 1px solid #888;
  width: 80%;
  display: flex;
  flex-direction: column;
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
    width: 100%;
  }
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
class FreeModal extends React.Component<Props> {
  public componentDidMount() {}
  public render() {
    return (
      <Modal show={this.props.show}>
        <ClickLayer onClick={this.props.close} />
        <ModalContent style={this.props.style}>
          {this.props.children}
        </ModalContent>
      </Modal>
    );
  }
}

export default FreeModal;
