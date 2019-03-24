import * as React from "react";
import styled from "../../../../styled-components";
import { ActionIconBox, ActionButton } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, Slider } from "antd";

interface Props {
  input: any;
  activeObjects: any[];
}

const Container = styled.div`
  height: 100%; /* 100% Full-height */
  width: 300px; /* 0 width - change this with JavaScript */
  position: absolute;
  z-index: 1;
  top: 0;
  left: 100%;
  color: ${props => props.theme.secondary};
`;

const SliderContainer = styled.div`
  height: 100%;
  width: 300px;
  position: relative;
  transform: translate(0, 0);
  background-color: ${props => props.theme.bg_secondary};
  z-index: 1;
  overflow-x: hidden;
  transition: transform 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  &.open {
    transform: translate(-300px, 0);
  }
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${prosp => prosp.theme.secondary};
  font-size: 1.3em;
  font-weight: bolder;
  padding-right: 15px;
  line-height: 40px;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px;
`;

const CloseBox = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ObjectEditorSidebar extends React.Component<Props> {
  private setFill = (e: any) => {
    this.props.input.canvasStore.setObjectAttribute(e.target.value, "fill");
    this.forceUpdate();
  };
  private setStroke = (e: any) => {
    this.props.input.canvasStore.setObjectAttribute(e.target.value, "stroke");
    this.forceUpdate();
  };
  private setOpacity = (e: any) => {
    this.props.input.canvasStore.setObjectAttribute(e, "opacity");
    this.forceUpdate();
  };
  private setStrokeWidth = (e: any) => {
    this.props.input.canvasStore.setObjectAttribute(e, "strokeWidth");
    this.forceUpdate();
  };

  public render() {
    const activeObjects = this.props.activeObjects;
    return (
      <Container>
        <SliderContainer
          className={this.props.input.isObjectEditOpen ? "open" : "closed"}
        >
          <Header onClick={() => this.props.input.setIsObjectEditOpen(false)}>
            <CloseBox>
              <FontAwesomeIcon icon="times" />
            </CloseBox>
            Fermer
          </Header>
          {activeObjects.length > 0 ? (
            <Body>
              <ActionButton
                onClick={this.props.input.canvasStore.toggleObjFond}
                title={"Retirer fond"}
              />
              <Divider />
              <p>couleur de fond</p>
              <Input
                type="color"
                value={activeObjects[0].fill}
                onChange={this.setFill}
              />
              <Divider />
              <p>couleur de bordure</p>
              <Input
                type="color"
                value={activeObjects[0].stroke}
                onChange={this.setStroke}
              />
              <Divider />
              <p>opacité</p>
              <Slider
                value={activeObjects[0].opacity}
                onChange={this.setOpacity}
                min={0}
                max={1}
                step={0.1}
              />
              <Divider />
              <p>Epaisseur bordure</p>
              <Slider
                value={activeObjects[0].strokeWidth}
                onChange={this.setStrokeWidth}
                min={0}
                max={10}
                step={1}
              />
            </Body>
          ) : (
            <Body>
              <p>Aucun objet selectionné</p>
            </Body>
          )}
        </SliderContainer>
      </Container>
    );
  }
}

export default ObjectEditorSidebar;
