import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { EditorStore } from "../../../stores/editor.store";
import { Button, Row, Col } from "antd";
import styled from "../../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { ActionButton } from "../inputs/layouts/EditorButtons";

const ZOOM_STEP: number = 5;

interface Props extends RouteComponentProps {
  editorStore?: EditorStore;
  showAnswer: () => void;
  hideAnswer: () => void;
}

const Container = styled.div`
  height: 100%;
  width: 250px;
  padding: 20px;
  background-color: ${props => props.theme.bg_secondary};
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class PreviewToolbar extends React.Component<Props> {
  public zoom: number = 100;

  private zoomIn = () => {
    const el = document.getElementById("canvas-container");
    el!.style.width = `${this.zoom + ZOOM_STEP}%`;
    this.zoom += ZOOM_STEP;
  };
  private zoomOut = () => {
    const el = document.getElementById("canvas-container");
    el!.style.width = `${this.zoom - ZOOM_STEP}%`;
    this.zoom -= ZOOM_STEP;
  };

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <ActionButton
              onMouseOver={this.props.showAnswer}
              onMouseOut={this.props.hideAnswer}
              label="Montrer les champs"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ActionButton
              onClick={() => this.props.history.push("/editor/form")}
              label="Revenir à l'éditeur"
            />
          </Col>
        </Row>
        <Row type="flex">
          <ActionButton icon="minus" onClick={this.zoomOut} />
          <ActionButton icon="plus" onClick={this.zoomIn} />
        </Row>
      </Container>
    );
  }
}

export default withRouter(PreviewToolbar);
