import * as React from "react";
import { Layout, Breadcrumb, Icon } from "antd";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";
import bigLogo from "../../assets/images/big-logo.png";
import SideNavigation from "../navigation/SideNavigation";
const { Content } = Layout;

interface Props {
  uiStore?: any;
  sideContent: React.ReactChild | false;
  toolbar?: React.ReactChild;
  activePage?: string;
  p?: string;
}

const MyBreadcrumb = styled(Breadcrumb)`
  /* @media (max-width: ${_measures.tablet}px) {
    display: none;
  } */
`;

const MyLayout: any = styled.section`
  padding: ${(props: any) => props.p || "24px 24px"};
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
    const Toolbar = this.props.toolbar;
    return (
      <React.Fragment>
        <SideMenu>{Nav}</SideMenu>
        <MyLayout p={this.props.p}>{this.props.children}</MyLayout>
      </React.Fragment>
    );
  }
}

export default SubLayout;
