import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { UiStore } from "../../../stores/ui.store";
import { EditorStore } from "../../../stores/editor.store";
import { RouteChildrenProps } from "react-router";
import styled from "styled-components";
import { componentDirectMapping } from "../../../services/input-mapping.service";
import { Flex } from "../../../components/ui/Flex";
import { _measures } from "../../../assets/styles/_measures";
import { ReportStore } from "../../../stores/report.store";

interface Props extends RouteChildrenProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
  activeReport?: EditorStore;
  reportStore?: ReportStore;
}

const CanvasContainer = styled.div`
  width: 60%;
  height: 100%;
  margin: auto;
  overflow-x: auto;
  @media (max-width: ${_measures.tablet}px) {
    width: 100%;
  }
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
  editorStore: allStores.reportStore.activeReport,
  reportStore: allStores.reportStore,
  activeReport: allStores.reportStore.activeReport,
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
    this.props.activeReport && this.initialize(this.props.activeReport);
  }

  componentWillReceiveProps(newProps: any) {
    const render = newProps.activeReport.id !== this.props.activeReport!.id;
    render && this.props.reportStore!.renderCanvas();
  }

  private initialize = (report: EditorStore) => {
    this.props.reportStore!.mountTemplate("canvas-container");
    // set container layer
    this.containerLayer = document.getElementById("container-layer");
    // show container layer
    this.containerLayer!.setAttribute("display", "inline");
    // hide containers
    this.hideContainers();
    this.props.reportStore!.renderCanvas();
    this.addListeners();
  };

  private addListeners = () => {
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      if (el) {
        // get back corrspondant input
        //@ts-ignore
        const inputId = el.dataset.inputId;
        const inputEl = document.getElementById(inputId);
        //@ts-ignore
        const type: string = inputEl.dataset.type;
        el.addEventListener("click", () => {
          const Input = componentDirectMapping[type];
          this.setState({
            modalContent: (
              <Input inputId={inputId} reportId={this.props.activeReport!.id} />
            ),
          });
          this.props.uiStore!.setIsInputModalOpen(true);
        });
        el.addEventListener("mouseover", () => {
          el.setAttribute("stroke", "red");
          el.setAttribute("stroke-width", "5px");
        });
        el.addEventListener("mouseout", () => {
          el.setAttribute("stroke", "none");
          el.setAttribute("stroke-width", "0px");
        });
      }
    }
  };

  private hideContainers = () => {
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      el.setAttribute("fill", "transparent");
    }
  };

  public render() {
    return (
      <Flex dir="c">
        <Wrapper>
          <CanvasContainer>
            <div id="canvas-container" />
          </CanvasContainer>
        </Wrapper>
        {this.state.modalContent}
      </Flex>
    );
  }
}

export default Preview;
