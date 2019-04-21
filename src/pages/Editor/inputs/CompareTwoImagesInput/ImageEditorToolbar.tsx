import * as React from "react";
import styled from "../../../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageEditorSidebar from "./CustomObjectSidebar";
import ObjectEditorSidebar from "./ObjectEditorSidebar";
import { Menu, Dropdown } from "antd";
import { ActionButton } from "../../../../components/ui/Buttons";

interface Props {
  input: any;
  addObjects?: boolean;
}

const Container = styled.div`
  width: auto;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1em;
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const ActionLink = styled.span`
  color: ${props => props.theme.secondary};
  text-decoration: underline;
  font-size: 16px;
  cursor: pointer;
`;

class ImageEditorToolbar extends React.Component<Props> {
  public render() {
    const addMenu = (
      <Menu>
        <MenuItem onClick={this.props.input.canvasStore.addSquare}>
          <div>Carré</div>
          <MenuIcon icon="square" />
        </MenuItem>
        <MenuItem onClick={this.props.input.canvasStore.addCircle}>
          <div>Cercle</div>
          <MenuIcon icon="circle" />
        </MenuItem>
        <MenuItem onClick={this.props.input.canvasStore.addLine}>
          <div>Ligne</div>
          <MenuIcon icon="slash" />
        </MenuItem>
        <MenuItem onClick={this.props.input.canvasStore.addText}>
          <div>Texte</div>
          <MenuIcon icon="font" />
        </MenuItem>
      </Menu>
    );
    return (
      <Container>
        {this.props.addObjects && (
          <React.Fragment>
            {/* <ObjectEditorToolbar input={this.props.input} /> */}
            <ImageEditorSidebar input={this.props.input} />
            <ObjectEditorSidebar
              input={this.props.input}
              activeObjects={this.props.input.activeObjects}
            />
            <Dropdown overlay={addMenu}>
              <ActionLink>
                Ajouter <FontAwesomeIcon icon="plus" />
              </ActionLink>
            </Dropdown>
            <ActionButton
              disabled={this.props.input.canvasStore.canvasMode === "free"}
              onClick={this.props.input.canvasStore.drawingModeOn}
              m="5px"
              r={false}
              icon="pen"
            />
            <ActionButton
              disabled={this.props.input.canvasStore.canvasMode === "hand"}
              onClick={this.props.input.canvasStore.handModeOn}
              icon="hand-paper"
              r={false}
              m="5px"
            />
          </React.Fragment>
        )}

        <ActionButton
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.rotate("right")}
          r={false}
          icon="redo"
          m="5px"
        />

        <ActionButton
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.rotate("left")}
          r={false}
          icon="undo"
          m="5px"
        />

        <ActionButton
          disabled={this.props.input.activeObjects.length === 0}
          onClick={this.props.input.canvasStore.adjust}
          r={false}
          icon="expand"
          m="5px"
        />

        <ActionButton
          disabled={this.props.input.activeObjects.length === 0}
          onClick={this.props.input.canvasStore.center}
          r={false}
          icon="compress"
          m="5px"
        />

        <ActionButton
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.scale(0.1)}
          r={false}
          icon="expand-arrows-alt"
          m="5px"
        />

        <ActionButton
          disabled={this.props.input.activeObjects.length === 0}
          onClick={() => this.props.input.canvasStore.scale(-0.1)}
          r={false}
          icon="compress-arrows-alt"
          m="5px"
        />
      </Container>
    );
  }
}

export default ImageEditorToolbar;
