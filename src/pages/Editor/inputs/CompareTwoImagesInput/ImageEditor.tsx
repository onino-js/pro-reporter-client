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
import { CancelButton, OkButton } from "../layouts/EditorButtons";
import { _measures } from "../../../../assets/styles/_measures";

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
  width: 700px;
  height: ${(props: any) => 700 * props.ratio}px;
  outline: 1px dashed ${props => props.theme.secondary};
  margin: auto;
  /* margin-top: 50px; */
  @media (max-width: ${_measures.tablet}px) {
    width: 400px;
    height: ${(props: any) => 400 * props.ratio}px;
  }
  @media (max-width: 500px) {
    width: 300px;
    height: ${(props: any) => 300 * props.ratio}px;
  }
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

const CanvasContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const Footer = styled.div`
  width: 100%;
  height: 50px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.bg_secondary};
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
    // let maxHeight: number = 300;
    // let maxWidth: number = 300;
    // let canvasWidth: number = 300;
    // let canvasHeight: number = 300;
    // const imageRatio =
    //   this.props.input.options.height / this.props.input.options.width;
    // let currentRation = 1;
    // const boxEl = document.getElementById("canvas-wrapper");

    // if (boxEl) {
    //   maxHeight = boxEl!.getBoundingClientRect().height;
    //   maxWidth = boxEl!.getBoundingClientRect().width;
    //   if (maxHeight > 0 && maxWidth > 0) {
    //     currentRation = maxHeight / maxWidth;
    //     if (currentRation >= imageRatio) {
    //       canvasWidth = maxWidth;
    //       canvasHeight = maxWidth * imageRatio;
    //     } else {
    //       canvasHeight = maxHeight;
    //       canvasWidth = maxHeight / imageRatio;
    //     }
    //   }
    // }
    const imageRatio =
      this.props.input.options.height / this.props.input.options.width;
    const canvasWidth = 600;
    const canvasHeight = 600 * imageRatio;

    return (
      <React.Fragment>
        <Header>
          <Title>Edition</Title>
        </Header>
        <Clickable onClick={this.props.input.canvasStore.clearSelection} />
        <Body>
          <Indication>
            Cliquez sur l'image pour éditer la taille, la position, l'échelle et
            la rotation mannuellement. Ou bien utilisez les commandes suivantes
            pour modifier l'image :
          </Indication>
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
          <CanvasContainer id={"canvas-wrapper"}>
            <CanvasBox
              id={"canvas-container" + this.props.input.canvasId}
              width={canvasWidth}
              height={canvasHeight}
              ratio={imageRatio}
            >
              <canvas id={this.props.input.canvasId} />
            </CanvasBox>
          </CanvasContainer>
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
