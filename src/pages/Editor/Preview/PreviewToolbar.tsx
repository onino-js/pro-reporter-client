import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { EditorStore } from "../../../stores/editor.store";
import { Button } from "antd";
import styled from "../../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {
  editorStore?: EditorStore;
}

const Container = styled.div`
  width: 100%;
  height: 40px;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
}))
@observer
class PreviewToolbar extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <Button onClick={() => this.props.history.push("/editor/bley")}>
          Revenir à l'éditeur
        </Button>
      </Container>
    );
  }
}

export default withRouter(PreviewToolbar);
