import * as React from "react";
import { sliderInputRenderer } from "./sliderInputRenderer";
import * as ReactDOM from "react-dom";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { mainTheme } from "../../../../assets/styles/_colors";
import styled from "../../../../styled-components";
import { Col } from "antd";

export interface ISliderInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (e: number) => void;
  children?: React.ReactChild;
  width?: number;
  height?: number;
  barHeight?: number;
  barColor?: string;
  barBorderRadius?: number;
  markerColor?: string;
  overlapColor?: string;
  markerWidth?: number;
  markerHeight?: number;
  labelSuffix?: string;
  labelYOffset?: number;
  labelFontSize?: string;
  step?: number;
  input?: any;
}

const ValueBox = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 2em;
  color: ${props => props.theme.secondary};
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
  value: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0].value,
}))
@observer
class SliderInput extends React.Component<ISliderInputProps> {
  static defaultProps = {
    barColor: mainTheme.disabled,
    barBorderRadius: 4,
    barHeight: 10,
    markerColor: mainTheme.secondary,
    overlapColor: mainTheme.bg_secondary,
    markerWidth: 5,
    markerHeight: 20,
    labelSuffix: "",
    labelYOffset: 40,
    labelFontSize: "1em",
    step: 1,
  };

  private resizeListener: any = null;

  public componentDidMount() {
    this.renderSvg();
    window.addEventListener("resize", this.renderSvg);
  }

  public componentDidUpdate() {
    this.renderSvg();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.renderSvg);
  }

  private renderSvg = () => {
    const el = document.getElementById(this.props.input.svgId);
    sliderInputRenderer(el, {
      ...this.props,
      onChange: this.setValue,
      value: this.props.value,
      min: this.props.input.options.min,
      max: this.props.input.options.max,
      height: 20,
      step: this.props.input.options.step || 1,
      labelSuffix: this.props.input.options.label || "",
      labelFontSize: "2em",
    });
  };

  private setValue = (e: number) => this.props.input.setValue(e);

  public render() {
    return (
      <InputLayoutStandard input={this.props.input}>
        <Col xl={10}>
          <ValueBox>
            {`${this.props.value} ${this.props.input.options.label}`}
          </ValueBox>
        </Col>
        <Col
          xl={18}
          id={this.props.input.svgId}
          // style={{ width: "100%", height: "100%" }}
          style={{ display: "flex", flex: 1, height: "40px" }}
        />
        {/* <MyInput
        // allowClear={true}
        type="number"
        value={this.props.input!.value}
        // placeholder="Entrez une valeur"
        onChange={this.setValue}
      /> */}
      </InputLayoutStandard>
    );
  }
}

export default SliderInput;
