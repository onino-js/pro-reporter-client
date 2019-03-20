import * as React from "react";
import { inject, observer } from "mobx-react";
import { UiStore } from "../../stores/ui.store";
import { AllStores } from "../../models/all-stores.model";
import styled from "../../styled-components";
import { mainTheme } from "../../assets/styles/_colors";

interface Props {
  show: boolean;
}

const ModalHeader: any = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;

const ModalBody = styled.div`
  padding: 2px 16px;
`;

const ModalFooter = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
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

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class ProModal extends React.Component<Props> {
  componentDidMount() {}
  public render() {
    return (
      <Modal show={this.props.show}>
        <ModalContent>
          <ModalHeader>
            <span className="close">&times;</span>
            <h2>Modal Header</h2>
          </ModalHeader>
          <ModalBody>
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </ModalBody>
          <ModalFooter>
            <h3>Modal Footer</h3>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

export default ProModal;
