import * as React from "react";
import { Input } from "antd";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import styled from "../../../../styled-components";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import InputLayoutModal from "../layouts/InputLayoutModal";

interface Props {
  inputId: string;
  input?: any;
  layout?: any;
}

const MyInput = styled.input`
  width: 100%;
  flex : 1;
  border-radius: 0px;
  height: 40px;
  padding-left: 10px;
  font-size: 24px;
  /* font-weight : 900; */
  letter-spacing: 3px;
  /* border-width: 1px;
  border-color: ${props => props.theme.font_primary}; */
  outline : none;
  border : none;
  border-bottom: 1px solid ${props => props.theme.font_primary};
  color: ${props => props.theme.secondary};
  :focus {
    /* outline: 0;
    border-color: ${props => props.theme.secondary}; */
    transition: border-bottom-width 200ms ease-in-out;
    border-bottom-width: 3px;
  }
`;

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.editorStore.inputs.filter(item => item.id === inputId)[0],
}))
@observer
class StringInput extends React.Component<Props> {
  private setValue = (e: any) => {
    this.props.input.setValue(e.currentTarget.value);
  };
  public render() {
    const Layout =
      this.props.layout === "modal" ? InputLayoutModal : InputLayoutStandard;
    return (
      <Layout input={this.props.input}>
        <MyInput
          type="text"
          value={this.props.input!.value}
          // placeholder="Entrez une valeur"
          onChange={this.setValue}
        />
      </Layout>
    );
  }
}

export default StringInput;
