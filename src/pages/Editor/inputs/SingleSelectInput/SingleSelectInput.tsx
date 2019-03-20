import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";

interface Props {
  inputId: string;
  input?: any;
}

const SelectButton = styled.button`
  text-decoration: none;
  min-width: 70px;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.font_primary};
  color: ${({ theme }) => theme.font_primary};
  background-color: transparent;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.secondary};
    /* border: ${({ theme }) => theme.font_secondary}; */
    color: ${({ theme }) => theme.font_secondary};
    font-weight: 900;
  }
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
}))
@observer
class SingleSelectInput extends React.Component<Props> {
  private setValue = (e: string) => {
    this.props.input!.setValue(e);
  };
  public render() {
    return (
      <InputLayoutStandard input={this.props.input}>
        {this.props.input!.options.values.map((item: any, index: number) => (
          <SelectButton
            key={"single-select-input" + index}
            onClick={() => this.setValue(item)}
            className={this.props.input.value === item ? "active" : ""}
          >
            {item}
          </SelectButton>
        ))}
      </InputLayoutStandard>
    );
  }
}

export default SingleSelectInput;
