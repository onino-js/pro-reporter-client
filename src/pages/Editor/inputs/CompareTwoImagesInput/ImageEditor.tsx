import * as React from "react";
import styled from "../../../../styled-components";
import ImageEditorToolbar from "./ImageEditorToolbar";
import ProModal from "../../../../components/modals/ProModal";

interface Props {
  input: any;
  onOk: () => void;
  onCancel: () => void;
  isActiveSelection: boolean;
  isSideMenuOpen: boolean;
  isObjectEditOpen: boolean;
  canvasMode: any;
  addObjects?: boolean;
  activeObjects: any[];
  show: boolean;
}

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
`;

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

const Clickable = styled.div`
  width: 0px;
  height: 0px;
  background-color: blue;
`;
const Indication = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 16px;
`;

class ImageEditor extends React.Component<Props> {
  public render() {
    return (
      <ProModal
        show={this.props.show}
        close={this.props.onCancel}
        onOk={this.props.onOk}
        width={["80%", "100%"]}
        height={["100%", "100%"]}
      >
        <Body>
          <Clickable onClick={this.props.input.canvasStore.clearSelection} />
          <Indication>
            Cliquez sur l'image pour éditer la taille, la position, l'échelle et
            la rotation mannuellement. Ou bien utilisez les commandes suivantes
            pour modifier l'image :
          </Indication>

          <ImageEditorToolbar
            addObjects={this.props.addObjects}
            input={this.props.input}
          />
          <CanvasContainer>
            <Canvas id={this.props.input.canvasId} />
          </CanvasContainer>
        </Body>
      </ProModal>
    );
  }
}

export default ImageEditor;
