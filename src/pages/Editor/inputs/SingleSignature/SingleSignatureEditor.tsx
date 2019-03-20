import * as React from "react";
import styled from "../../../../styled-components";
import { Button, Col } from "antd";
import { ActionIconBox } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
const Indication = styled.p`
  margin-top: 50px;
`;

class SingleSignatureEditor extends React.Component<Props> {
  public render() {
    // const canvasWidth = this.props.input.options.width;
    const canvasWidth = 700;
    const canvasHeight =
      (this.props.input.options.height * 700) / this.props.input.options.width;
    return (
      <React.Fragment>
        <Header>
          <Title>Edition</Title>
        </Header>
        <Body>
          <Indication>Dessinez dans la zone ci dessous.</Indication>
          <ActionIconBox
            active={true}
            onClick={this.props.input.canvasStore.clearCanvas}
          >
            <FontAwesomeIcon icon="sync-alt" />
          </ActionIconBox>
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

export default SingleSignatureEditor;
