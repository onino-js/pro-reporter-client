import * as React from "react";
import { Layout, Breadcrumb, Icon } from "antd";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";
import bigLogo from "../../assets/images/big-logo.png";
import SideNavigation from "../navigation/SideNavigation";
const { Content } = Layout;

interface Props {
  uiStore?: any;
  sideContent: React.ReactChild;
  toolbar?: React.ReactChild;
  activePage?: string;
}

const MyBreadcrumb = styled(Breadcrumb)`
  /* @media (max-width: ${_measures.tablet}px) {
    display: none;
  } */
`;

const MyLayout = styled(Layout)`
  padding: 24px 24px;
  transition: padding 300ms ease-in-out;
  display: flex;
  flex-direction: column;
  @media (max-width: ${_measures.tablet}px) {
    padding: 0;
  }
`;

const SideMenu = styled.div`
  width: 250px;
  height: 100%;
  overflow: hidden;
  background-blend-mode: overlay;
  background-color: ${props => props.theme.bg_tertiary};
  background-image: url(${bigLogo});
  background-position: bottom;
  background-size: 600px auto;
  transition: width 300ms ease-in-out;
  background-repeat: no-repeat;
  @media (max-width: ${_measures.tablet}px) {
    width: 50px;
  }
`;

class SubLayout extends React.Component<Props> {
  public render() {
    const Nav = this.props.sideContent;
    const Toolbar = this.props.toolbar;
    return (
      <React.Fragment>
        <SideMenu>{Nav}</SideMenu>
        <MyLayout tagName="main">
          {/* <MyBreadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Baux</Breadcrumb.Item>
          </MyBreadcrumb> */}
          {Toolbar && Toolbar}
          <section
            // tagName="section"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              background: "#fff",
              // padding: "0px 24px 24px 24px",
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflowY: "auto",
            }}
          >
            {this.props.children}
          </section>
        </MyLayout>
      </React.Fragment>
    );
  }
}

export default SubLayout;
