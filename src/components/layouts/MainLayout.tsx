import * as React from "react";
import MainHeader from "./MainHeader";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";

interface Props {
  // uiStore?: UiStore;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  @media (max-width: ${_measures.mobile}px) {
    flex-direction: column;
  }
`;

class MainLayout extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <MainHeader />
        <Wrapper style={{ display: "flex", flex: 1 }}>
          {this.props.children}
        </Wrapper>
      </Container>
    );
  }
}

export default MainLayout;
