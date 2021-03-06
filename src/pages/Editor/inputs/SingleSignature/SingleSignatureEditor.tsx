import * as React from "react";
import styled from "../../../../styled-components";
import ProModal from "../../../../components/modals/ProModal";
import { ActionButton } from "../../../../components/ui/Buttons";

interface Props {
  input: any;
  onOk: () => void;
  onCancel: () => void;
  show: boolean;
}

const CanvasContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Canvas = styled.canvas`
  border: 1px dashed ${props => props.theme.secondary};
`;
const Body = styled.div`
  width: 100%;
  position: relative;
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.bg_primary};
  overflow: hidden;
  padding: 20px;
  min-height: 500px;
`;
const Indication = styled.p`
  margin-top: 10px;
`;

class SingleSignatureEditor extends React.Component<Props> {
  public render() {
    return (
      <ProModal
        show={this.props.show}
        close={this.props.onCancel}
        onOk={this.props.onOk}
        width={["80%", "100%"]}
        height={["auto", "100%"]}
      >
        <Body>
          <ActionButton
            onClick={this.props.input.canvasStore.clearCanvas}
            icon="sync-alt"
            size="big"
          />
          <Indication>Dessinez dans la zone ci dessous.</Indication>
          <CanvasContainer>
            <Canvas id={this.props.input.canvasId} />
          </CanvasContainer>
        </Body>
      </ProModal>
    );
  }
}

export default SingleSignatureEditor;
