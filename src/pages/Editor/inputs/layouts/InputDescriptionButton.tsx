import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import { UiStore } from "../../../../stores/ui.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../../../styled-components";
import { Iinput, IinputStore } from "../../../../models/template.model";

interface Props {
  uiStore?: UiStore;
  input: IinputStore;
}

const Container = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class InputDescriptionButton extends React.Component<Props> {
  private showDescription = () => {
    this.props.uiStore!.showModal("input-description");
    this.props.uiStore!.setDescriptionInput({
      type: this.props.input!.inputRef.descriptionType!,
      content: this.props.input!.inputRef.description!,
    });
  };

  public render() {
    return (
      <Container onClick={this.showDescription}>
        <FontAwesomeIcon icon="question-circle" />
      </Container>
    );
  }
}

export default InputDescriptionButton;
