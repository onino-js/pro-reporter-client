import * as React from "react";
import styled from "../../../../styled-components";
import { ActionIconBox, ActionButton } from "../layouts/InputButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  input: any;
}

const Container = styled.div`
  height: 100%; /* 100% Full-height */
  width: 300px; /* 0 width - change this with JavaScript */
  position: absolute;
  z-index: 1;
  top: 0;
  left: 100%;
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

const CloseBox = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ImageEditorSidebar extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <SliderContainer
          className={this.props.input.isSideMenuOpen ? "open" : "closed"}
        >
          <Header onClick={() => this.props.input.setIsSideMenuOpen(false)}>
            <CloseBox>
              <FontAwesomeIcon icon="times" />
            </CloseBox>
            Fermer
          </Header>
          <ActionButton
            onClick={this.props.input.canvasStore.addSquare}
            title="Ajouter un carré"
            icon="square"
          />
          <ActionButton
            onClick={this.props.input.canvasStore.addCircle}
            title="Ajouter un cercle"
            icon="circle"
          />
          <ActionButton
            onClick={this.props.input.canvasStore.addLine}
            title="Ajouter une ligne"
            icon="slash"
          />
          <ActionButton
            onClick={this.props.input.canvasStore.addText}
            title="Ajouter du texte"
            icon="font"
          />
        </SliderContainer>
      </Container>
    );
  }
}

export default ImageEditorSidebar;
