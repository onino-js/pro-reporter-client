import * as React from "react";
import ReactDOM from "react-dom";
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

interface Props extends RouteChildrenProps {
  uiStore?: UiStore;
  editorStore?: EditorStore;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class Preview extends React.Component<Props> {
  public state = {
    activeSectionIndex: 0,
  };

  componentDidMount() {
    document.getElementById("bley")!.innerHTML = template;
    this.props.editorStore!.inputs.forEach((input, index) => {
      this.populate({ id: input.id, type: input.type, value: input.value });
    });
  }

  private populate = ({
    id,
    type,
    value,
  }: {
    id: string;
    type: string;
    value: any;
  }) => {
    const el = document.getElementById(id);
    if (type === "string" || "single-select") {
      el && (el.textContent = value);
    }
    if (type === "single-image") {
      //@ts-ignore
      el && el.setAttribute("xlink:href", value);
    }
  };

  public render() {
    return (
      <MainLayout>
        <SubLayout toolbar={<PreviewToolbar />} sideContent={<div />}>
          <Container id="bley" />
        </SubLayout>
      </MainLayout>
    );
  }
}

export default Preview;
