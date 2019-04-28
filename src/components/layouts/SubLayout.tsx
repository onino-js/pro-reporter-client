import * as React from "react";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";
import bigLogo from "../../assets/images/big-logo.png";
import { UiStore } from "../../stores/ui.store";

interface Props {
  uiStore?: UiStore;
  sideContent: React.ReactChild | false;
  toolbar?: React.ReactChild;
  activePage?: string;
  p?: string;
}

const ProLayout = styled.section<{p?:string}>`
  padding: ${(props: { p?: string }) => props.p || "24px 24px"};
  transition: padding 300ms ease-in-out;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  background-color: ${props => props.theme.disabled};
  @media (max-width: ${_measures.tablet}px) {
    padding: 0;
  }
`;

const SideMenu = styled.div`
  width: 200px;
  height: 100%;
  overflow: hidden;
  background-blend-mode: overlay;
  background-color: ${props => props.theme.bg_tertiary};
  background-image: url(${bigLogo});
  background-position: bottom;
  background-size: 400px auto;
  transition: width 300ms ease-in-out;
  background-repeat: no-repeat;
  @media (max-width: ${_measures.mobile}px) {
    width: 50px;
  }
`;

class SubLayout extends React.Component<Props> {
  public render() {
    const Nav = this.props.sideContent || null;
    return (
      <React.Fragment>
        <SideMenu>{Nav}</SideMenu>
        <ProLayout p={this.props.p}>{this.props.children}</ProLayout>
      </React.Fragment>
    );
  }
}

export default SubLayout;
