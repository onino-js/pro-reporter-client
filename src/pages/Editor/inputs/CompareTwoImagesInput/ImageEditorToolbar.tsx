import * as React from "react";
import styled from "../../../../styled-components";
import { ActionIconBox } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.rotate("right")}
          title="Rotation de 90° vers la droite"
        >
          <FontAwesomeIcon icon="redo" />
        </ActionIconBox>
        <ActionIconBox
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.rotate("left")}
        >
          <FontAwesomeIcon icon="undo" />
        </ActionIconBox>
        <ActionIconBox
          disabled={this.props.input.activeObjects.length === 0}
          onClick={this.props.input.canvasStore.adjust}
        >
          <FontAwesomeIcon icon="expand" />
        </ActionIconBox>
        <ActionIconBox
          disabled={this.props.input.activeObjects.length === 0}
          onClick={this.props.input.canvasStore.center}
        >
          <FontAwesomeIcon icon="compress" />
        </ActionIconBox>
        <ActionIconBox
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.scale(0.1)}
        >
          <FontAwesomeIcon icon="expand-arrows-alt" />
        </ActionIconBox>
        <ActionIconBox
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.scale(-0.1)}
        >
          <FontAwesomeIcon icon="compress-arrows-alt" />
        </ActionIconBox>
      </Container>
    );
  }
}

export default ImageEditorToolbar;
