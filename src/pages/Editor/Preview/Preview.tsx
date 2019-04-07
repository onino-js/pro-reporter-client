import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { UiStore } from "../../../stores/ui.store";
import { EditorStore } from "../../../stores/editor.store";
import { RouteChildrenProps } from "react-router";
import styled from "styled-components";
import { template } from "../../../assets/static-data/templates/gaz-linking-1";
import MainLayout from "../../../components/layouts/MainLayout";
import SubLayout from "../../../components/layouts/SubLayout";
import PreviewToolbar from "./PreviewToolbar";
import { componentMapping } from "../../../services/input-mapping.service";
import FreeModal from "../../../components/modals/FreeModal";
import { mainTheme } from "../../../assets/styles/_colors";

interface Props extends RouteChildrenProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
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

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class Preview extends React.Component<Props> {
  public state = {
    activeSectionIndex: 0,
    isInputModalOpen: false,
    modalContent: null,
  };

  componentDidMount() {
    document.getElementById("canvas-container")!.innerHTML = template;
    this.props.editorStore!.inputs.forEach((input, index) => {
      this.populate({ id: input.id, type: input.type, value: input.value });
      this.addListener({ id: input.id, type: input.type, value: input.value });
    });
  }

  private showInputModal = () => {
    this.setState({ isInputModalOpen: true });
  };
  private closeInputModal = () => {
    this.setState({ isInputModalOpen: false });
  };

  private showAnswer = () => {
    var elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      //@ts-ignore
      const inputId = el.dataset.inputId;
      console.log(inputId);
      const status = this.props.editorStore!.inputs.find(
        (input: any) => input.id === inputId,
      ).status;
      console.log(status);
      const color = status === "valid" ? "green" : "red";
      el.setAttribute("fill", color);
    }
  };

  private hideAnswer = () => {
    var elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      el.setAttribute("fill", "transparent");
    }
  };

  private addListener = ({ id, type, value }: any) => {
    const el = document.getElementById(id + "-container");
    if (el) {
      el.addEventListener("click", () => {
        const Input = componentMapping[type];
        this.setState({
          isInputModalOpen: true,
          modalContent: <Input inputId={id} layout="modal" />,
        });
      });
      el.addEventListener("mouseover", () => {
        el.setAttribute("fill", "red");
      });
      el.addEventListener("mouseout", () => {
        el.setAttribute("fill", "transparent");
      });
    }
  };

  private populate = ({
    id,
    type,
    value,
  }: {
    id: string;
    type: string;
    value: any;
  }) => {
    let el: any;
    if (type === "string" || type === "single-select") {
      el = document.getElementById(id);
      el && (el.textContent = value);
    }
    if (
      type === "single-image" ||
      type === "single-image-editable" ||
      type === "single-signature"
    ) {
      id === "travaux" && console.log(type, "putain");
      el = document.getElementById(id);
      //@ts-ignore
      el && el.setAttribute("xlink:href", value);
    }
    if (type === "compare-two-images") {
      const el = document.getElementById(id);
      const elBefore = el!.getElementsByClassName("before")[0];
      const elAfter = el!.getElementsByClassName("after")[0];
      //@ts-ignore
      elBefore.setAttribute("xlink:href", value.before);
      //@ts-ignore
      elAfter.setAttribute("xlink:href", value.after);
    }
  };

  public render() {
    return (
      <MainLayout>
        <SubLayout
          toolbar={
            <PreviewToolbar
              showAnswer={this.showAnswer}
              hideAnswer={this.hideAnswer}
            />
          }
          sideContent={<div />}
        >
          <Container id="canvas-container" />
          <FreeModal
            close={this.closeInputModal}
            show={this.state.isInputModalOpen}
            style={{
              width: "80%",
              height: "auto",
              backgroundColor: mainTheme.bg_secondary,
              borderRadius: "40px",
              border: "none",
            }}
          >
            {this.state.modalContent}
            <Footer>
              <OkButton onClick={this.closeInputModal}>FERMER</OkButton>
            </Footer>
          </FreeModal>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default Preview;
