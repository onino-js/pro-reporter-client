import * as React from "react";
import styled from "../../../../styled-components";
import { Button } from "antd";
import { ActionIconBox, ActionButton } from "../layouts/InputButtons";
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

class ObjectEditorToolbar extends React.Component<Props> {
  private toggleAddMenu = () => {
    this.props.input.toggleIsSideMenuOpen();
  };
  private removeSelection = () => {
    this.props.input.removeSelection();
  };
  private editSelection = () => {
    this.props.input.setIsObjectEditOpen(true);
  };
  public render() {
    return (
      <Container>
        <ActionButton
          onClick={this.toggleAddMenu}
          title="Ajouter un objet"
          icon="plus"
        />
        <ActionButton
          disabled={this.props.input.canvasStore.canvasMode === "free"}
          onClick={this.props.input.canvasStore.drawingModeOn}
          title="mode tracé"
          icon="pen"
        />
        <ActionButton
          disabled={this.props.input.canvasStore.canvasMode === "hand"}
          onClick={this.props.input.canvasStore.handModeOn}
          title="mode sélection"
          icon="hand-paper"
        />
        <ActionButton
          disabled={!this.props.input.isActiveSelection}
          onClick={this.editSelection}
          title="Editer la sélection"
          icon="edit"
        />
        <ActionButton
          disabled={!this.props.input.isActiveSelection}
          onClick={this.removeSelection}
          title="Supprimer la sélection"
          icon="times"
        />
      </Container>
    );
  }
}

export default ObjectEditorToolbar;
