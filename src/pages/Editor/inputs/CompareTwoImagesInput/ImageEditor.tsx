import * as React from "react";
import styled from "../../../../styled-components";
import ImageEditorToolbar from "./ImageEditorToolbar";
import ImageEditorSidebar from "./ImageEditorSidebar";
import { Button } from "react-native";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { ActionButton } from "../layouts/InputButtons";
import ObjectEditorToolbar from "./ObjectEditorToolbar";
import ObjectEditorSidebar from "./ObjectEditorSidebar";

interface Props {
  //  inputId: any;
  input: any;
  onOk: () => void;
  onCancel: () => void;
  isActiveSelection: boolean;
  isSideMenuOpen: boolean;
  isObjectEditOpen: boolean;
  canvasMode: any;
  addObjects?: boolean;
  activeObjects: any[];
}

const Title = styled.h2`
  color: ${props => props.theme.primary};
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.bg_secondary};
`;
const CanvasBox: any = styled.div`
  width: ${(props: any) => props.width}px;
  height: ${(props: any) => props.height}px;
  outline: 1px dashed ${props => props.theme.secondary};
  margin-top: 50px;
`;
const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.bg_secondary};
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
`;
const Footer = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.bg_secondary};
`;
const OkButton = styled.button`
  background-color: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.font_secondary};
  height: 40px;
  cursor: pointer;
  width: 120px;
`;
const CancelButton = styled.button`
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid ${props => props.theme.font_secondary};
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
  height: 40px;
  width: 120px;
`;
const Clickable = styled.div`
  width: 0px;
  height: 0px;
  background-color: blue;
`;
const Indication = styled.p`
  margin-top: 50px;
`;

// @inject((allStores: AllStores, { inputId }) => ({
//   // uiStore: allStores.uiStore,
//   input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
// }))
// @observer
class ImageEditor extends React.Component<Props> {
  public render() {
    // const canvasWidth = this.props.input.options.width;
    const canvasWidth = 400;
    const canvasHeight =
      (this.props.input.options.height * 400) / this.props.input.options.width;
    return (
      <React.Fragment>
        <Header>
          <Title>Edition</Title>
        </Header>
        <Clickable onClick={this.props.input.canvasStore.clearSelection} />
        <Body>
          {/* <Indication>
            Cliquez sur l'image pour éditer la taille, la position, l'échelle et
            la rotation mannuellement. Ou bien utilisez les commandes suivantes
            pour modifier l'image :
          </Indication> */}
          {this.props.addObjects && (
            <React.Fragment>
              <ObjectEditorToolbar input={this.props.input} />
              <ImageEditorSidebar input={this.props.input} />
              <ObjectEditorSidebar
                input={this.props.input}
                activeObjects={this.props.input.activeObjects}
              />
            </React.Fragment>
          )}
          <ImageEditorToolbar input={this.props.input} />

          <CanvasBox
            id={"canvas-container" + this.props.input.canvasId}
            width={canvasWidth}
            height={canvasHeight}
          >
            <canvas id={this.props.input.canvasId} />
          </CanvasBox>
        </Body>
        <Footer>
          <CancelButton onClick={this.props.onCancel}>CANCEL</CancelButton>
          <OkButton onClick={this.props.onOk}>OK</OkButton>
        </Footer>
      </React.Fragment>
    );
  }
}

export default ImageEditor;
