import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { UiStore } from "../../../stores/ui.store";
import { EditorStore } from "../../../stores/editor.store";
import { RouteChildrenProps } from "react-router";
import styled from "styled-components";
import PreviewToolbar from "./PreviewToolbar";
import { componentDirectMapping } from "../../../services/input-mapping.service";
import { Flex } from "../../../components/ui/Flex";

interface Props extends RouteChildrenProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
}

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex: 1;
  margin: 0;
  min-height: 280px;
  overflow-y: auto;
  background-color: ${props => props.theme.bg_primary};
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class Preview extends React.Component<Props> {
  public state = {
    activeSectionIndex: 0,
    modalContent: null,
  };

  public containerLayer: any = null;
  public editedInput: any = null;

  componentDidMount() {
    this.props.editorStore!.getTemplate();
    this.props.editorStore!.mountTemplate("canvas-container");

    // set container layer
    this.containerLayer = document.getElementById("container-layer");
    // show container layer
    this.containerLayer!.setAttribute("display", "inline");
    // hide containers
    this.hideContainers();

    // check if there is inputs in editor store
    const inputs = this.props.editorStore!.inputs;
    if (inputs.length === 0) this.props.editorStore!.buildInputAndSections();

    this.props.editorStore!.renderCanvas();
    this.addListeners();
  }

  private addListeners = () => {
    this.props.editorStore!.inputs.forEach((input, index) => {
      this.addListener({
        id: input.id,
        type: input.type,
        value: input.value,
      });
    });
  };

  private showAnswer = () => {
    this.containerLayer!.setAttribute("opacity", "0.3");
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      //@ts-ignore
      const inputId = el.dataset.inputId;
      const status = this.props.editorStore!.inputs.find(
        (input: any) => input.id === inputId,
      ).status;
      const color = status === "valid" ? "green" : "red";
      el.setAttribute("fill", color);
    }
  };

  private hideAnswer = () => {
    this.containerLayer!.setAttribute("opacity", "0.3");
    this.hideContainers();
  };

  private hideContainers = () => {
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      el.setAttribute("fill", "transparent");
    }
  };

  private addListener = ({ id, type, value }: any) => {
    const el = document.getElementById(id + "-container");
    if (el) {
      el.addEventListener("click", () => {
        const Input = componentDirectMapping[type];
        this.setState({
          modalContent: <Input inputId={id} />,
        });
        this.props.uiStore!.setIsInputModalOpen(true);
      });
      el.addEventListener("mouseover", () => {
        el.setAttribute("fill", "red");
        el.setAttribute("opacity", "0.3");
      });
      el.addEventListener("mouseout", () => {
        el.setAttribute("fill", "transparent");
      });
    }
  };

  public render() {
    return (
      <Flex dir="c">
        <Wrapper>
          <CanvasContainer>
            <div id="canvas-container" />
          </CanvasContainer>
          <PreviewToolbar
            showAnswer={this.showAnswer}
            hideAnswer={this.hideAnswer}
          />
        </Wrapper>
        {this.state.modalContent}
      </Flex>
    );
  }
}

export default Preview;
