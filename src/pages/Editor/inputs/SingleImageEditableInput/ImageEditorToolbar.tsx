import * as React from "react";
import styled from "../../../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIconBox } from "../../../../components/ui/Buttons";

interface Props {
  input: any;
}

const Container = styled.div`
  width: auto;
  height: 50px;
  display: flex;
  margin-top: 20px;
`;

class ImageEditorToolbar extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <ActionIconBox
          active={true}
          onClick={() => this.props.input.canvasStore.rotate("right")}
        >
          <FontAwesomeIcon icon="redo" />
        </ActionIconBox>
        <ActionIconBox
          active={true}
          onClick={() => this.props.input.canvasStore.rotate("left")}
        >
          <FontAwesomeIcon icon="undo" />
        </ActionIconBox>
        <ActionIconBox
          active={true}
          onClick={this.props.input.canvasStore.adjust}
        >
          <FontAwesomeIcon icon="expand" />
        </ActionIconBox>
        <ActionIconBox
          active={true}
          onClick={this.props.input.canvasStore.center}
        >
          <FontAwesomeIcon icon="compress" />
        </ActionIconBox>
        <ActionIconBox
          active={true}
          onClick={() => this.props.input.canvasStore.scale(0.1)}
        >
          <FontAwesomeIcon icon="expand-arrows-alt" />
        </ActionIconBox>
        <ActionIconBox
          active={true}
          onClick={() => this.props.input.canvasStore.scale(-0.1)}
        >
          <FontAwesomeIcon icon="compress-arrows-alt" />
        </ActionIconBox>
      </Container>
    );
  }
}

export default ImageEditorToolbar;
