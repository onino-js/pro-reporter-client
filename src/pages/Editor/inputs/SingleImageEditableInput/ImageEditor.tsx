import * as React from "react";
import styled from "../../../../styled-components";
import { Button } from "antd";
import ImageEditorToolbar from "./ImageEditorToolbar";

interface Props {
  input: any;
  onOk: () => void;
  onCancel: () => void;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.bg_primary};
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

class ImageEditor extends React.Component<Props> {
  public render() {
    return (
      <React.Fragment>
        <Header>
          <Title>Edition</Title>
        </Header>
        <Clickable onClick={this.props.input.canvasStore.clearSelection} />
        <Body>
          <ImageEditorToolbar input={this.props.input} />
          <CanvasBox
            id={"canvas-container" + this.props.input.canvasId}
            width={this.props.input.options.width}
            height={this.props.input.options.height}
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
