import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { UiStore } from "../../../stores/ui.store";
import { Report } from "../../../stores/report";
import { RouteChildrenProps } from "react-router";
import styled from "styled-components";
import { componentDirectMapping } from "../../../services/input-mapping.service";
import { Flex } from "../../../components/ui/Flex";
import { _measures } from "../../../assets/styles/_measures";
import { ReportStore } from "../../../stores/report.store";

interface Props {
  uiStore?: UiStore;
  Report?: Report;
  activeReport?: Report;
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
  flex: 1;
  margin: 0;
  overflow-y: auto;
  background-color: ${props => props.theme.bg_primary};
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  Report: allStores.reportStore.activeReport,
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
    this.props.activeReport && this.initialize();
  }

  componentWillReceiveProps(newProps: any) {
    const render = newProps.activeReport.id !== this.props.activeReport!.id;
    render && this.props.reportStore!.renderCanvas();
  }

  private initialize = () => {
    this.props.reportStore!.mountTemplate("canvas-container");
    // set container layer
    this.containerLayer = document.getElementById("container-layer");
    // show container layer
    this.containerLayer!.setAttribute("display", "inline");
    // hide containers
    this.hideContainers();
    this.props.reportStore!.renderCanvas();
    this.addListeners();
    // this.buildContainer();
  };

  // private buildContainer = () => {
  //   const svg = d3.select("#canvas-container").select("svg");
  //   const group = svg.append("g").attr("class", "group-container");

  //   svg.selectAll(".pro-input").each(function(input, index) {
  //     let x;
  //     let y;
  //     if (
  //       d3.select(this).attr("x") === null ||
  //       d3.select(this).attr("y") === null
  //     ) {
  //       //@ts-ignore
  //       const coord = this.getBoundingClientRect();
  //       x = coord.x;
  //       y = coord.y;
  //     } else {
  //       x = d3.select(this).attr("x");
  //       y = d3.select(this).attr("y");
  //     }
  //     //@ts-ignore
  //     group
  //       .append("rect")
  //       .attr("cx", x)
  //       .attr("cy", y)
  //       .attr("r", 10)
  //       .attr("fill", "red");
  //     group
  //       .append("text")
  //       //@ts-ignore
  //       .text(this.dataset.label)
  //       .attr("x", x)
  //       .attr("y", y);
  //   });
  // };

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
      <Flex dir="c" flex={1}>
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
