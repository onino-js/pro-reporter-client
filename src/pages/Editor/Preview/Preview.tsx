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

  public containerLayer: any = null;

  componentDidMount() {
    document.getElementById("canvas-container")!.innerHTML = template;
    // set container layer
    this.containerLayer = document.getElementById("container-layer");
    // show container layer
    this.containerLayer!.setAttribute("display", "inline");
    // hide containers
    this.hideContainers();

    // check if there is inputs in editor store
    const inputs = this.props.editorStore!.inputs;
    if (inputs.length === 0) this.buildInputList();
    inputs.forEach((input, index) => {
      this.populate({ id: input.id, type: input.type, value: input.value });
      this.addListener({
        id: input.id,
        type: input.type,
        value: input.value,
      });
    });
  }

  private showInputModal = () => {
    this.setState({ isInputModalOpen: true });
  };

  private closeInputModal = () => {
    this.setState({ isInputModalOpen: false });
    const inputs = this.props.editorStore!.inputs;
    inputs.forEach((input, index) => {
      this.populate({ id: input.id, type: input.type, value: input.value });
    });
  };

  private showAnswer = () => {
    this.containerLayer!.setAttribute("opacity", "0.5");
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
    this.containerLayer!.setAttribute("opacity", "1");
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
    if (type === "string") {
      // @ts-ignore
      el = document.getElementById(id).getElementsByTagName("tspan")[0];
      el && (el.textContent = value);
    }
    if (type === "single-select") {
      const textElems = document
        .getElementById(id)!
        .getElementsByTagName("text");
      for (let i = 0; i < textElems.length; i++) {
        //@ts-ignore
        if (textElems[i].dataset.value === value) {
          textElems[i].getElementsByTagName("tspan")[0].textContent = "X";
        } else {
          textElems[i].getElementsByTagName("tspan")[0].textContent = "";
        }
      }
    }
    if (
      type === "single-image" ||
      type === "single-image-editable" ||
      type === "single-signature"
    ) {
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

  private buildInputList = () => {
    const sections = [];
    const sectionsElems = document.getElementsByClassName("section");

    for (let i = 0; i < sectionsElems.length; i++) {
      const sectionElem = sectionsElems[i];
      //@ts-ignore
      const sectionId = sectionElem.id;
      //@ts-ignore
      const sectionLabel = sectionElem.dataset.label;

      // Check if there is subsections
      const subsections: any[] = [];
      const subsectionsElems = sectionElem.getElementsByClassName("subsection");

      if (subsectionsElems.length !== 0) {
        for (let i = 0; i < subsectionsElems.length; i++) {
          const subsectionElem = subsectionsElems[i];
          //@ts-ignore
          const subsectionId = subsectionElem.id;
          //@ts-ignore
          const subsectionLabel = subsectionElem.dataset.label;
          subsections.push({
            id: subsectionId,
            label: subsectionLabel,
          });
          const elems = subsectionElem.getElementsByClassName("pro-input");
          this.buildInputs({
            elems: elems,
            sectionId: sectionId,
            subsectionId: subsectionId,
          });
        }
      } else {
        const elems = sectionElem.getElementsByClassName("pro-input");
        this.buildInputs({
          elems: elems,
          sectionId: sectionId,
          subsectionId: false,
        });
      }

      sections.push({
        id: sectionId,
        label: sectionLabel,
        subsections: subsections,
      });
    }
    this.props.editorStore!.createSections(sections);
  };

  private buildInputs = ({ elems, sectionId, subsectionId }: any) => {
    // for each input
    for (let i = 0; i < elems.length; i++) {
      //  determine type, section and subsection
      const el = elems[i];
      //@ts-ignore
      const id = el.id;
      //@ts-ignore
      const type = el.dataset.type;
      //@ts-ignore
      const label = el.dataset.label;

      // Build input object
      const input = {
        id,
        type,
        label,
        sectionId,
        subsectionId,
        value: "",
      };
      switch (type) {
        case "string":
          //@ts-ignore
          input.value = "";
          //input.value = el.textContent;
          break;
        case "number":
          //@ts-ignore
          input.value = 0;
          // input.value = Number(el.textContent);
          break;
        case "single-image":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          // input.options = { height: el. };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-image-editable":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.options = {
            height: el.getBoundingClientRect().height,
            width: el.getBoundingClientRect().width,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "compare-two-images":
          //@ts-ignore
          input.value = "";
          const imgEl = el.getElementsByTagName("image")[0];
          //@ts-ignore
          input.options = {
            height: imgEl.getBoundingClientRect().height,
            width: imgEl.getBoundingClientRect().width,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-select":
          const values: string[] = [];
          const textEls = el.getElementsByTagName("text");
          for (let i = 0; i < textEls.length; i++) {
            values.push(textEls[i].dataset.value);
          }
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.options = { values: values };
          break;
      }
      // Create observable variable in store
      this.props.editorStore!.createInput(input);
      // this.addListener({ id: input.id, type: input.type, value: input.value });
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
