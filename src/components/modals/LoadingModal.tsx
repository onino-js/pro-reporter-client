import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";
import { SpiralSpinner } from "react-spinners-kit";
import { mainTheme } from "../../assets/styles/_colors";

interface Props {
  show: boolean;
  message?: string;
}

const Modal: any = styled.div`
  display: ${(props: any) =>
    props.show ? "flex" : "none"}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(255, 255, 255); /* Fallback color */
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const SpinerBox = styled.div`
  margin-bottom: 40px;
`;

const MessageContent = styled.div`
  color : ${props => props.theme.secondary}
  max-width : 400px;
  font-size : 16px;
  text-align : center;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class LoadingModal extends React.Component<Props> {
  public componentDidMount() {}
  public render() {
    return (
      <Modal show={this.props.show}>
        <ModalContent>
          <SpinerBox>
            <SpiralSpinner
              size={140}
              frontColor={mainTheme.secondary}
              loading={true}
            />
          </SpinerBox>
          {this.props.message && (
            <MessageContent>{this.props.message}</MessageContent>
          )}
        </ModalContent>
      </Modal>
    );
  }
}

export default LoadingModal;
