import * as React from "react";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";
import bigLogo from "../../assets/images/big-logo.png";
import { UiStore } from "../../stores/ui.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import TopNavigation from "../navigation/TopNavigation";

interface Props {
  uiStore?: UiStore;
  sideContent: React.ReactChild | false;
  topContent?: React.ReactChild | false;
  toolbar?: React.ReactChild;
  activePage?: string;
  p?: string;
}

const ProLayout = styled.section<{ p?: string }>`
  padding: ${(props: { p?: string }) => props.p || "24px 24px"};
  transition: padding 300ms ease-in-out;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
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
  flex-shrink: 0;
  @media (max-width: ${_measures.phablet}px) {
    width: 50px;
  }
  @media (max-width: ${_measures.mobile}px) {
    display: none;
  }
`;

interface ITopMenuProps {
  active: boolean;
}

const TopMenu: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})<ITopMenuProps>`
  display: none;
  width: 100%;
  height: 20px;
  background-color: ${props => props.theme.bg_tertiary};
  transition: height 300ms ease-in-out;
  background-repeat: no-repeat;
  flex-shrink: 0;
  overflow: hidden;
  &.active {
    height: 300px;
  }
  @media (max-width: ${_measures.mobile}px) {
    display: flex;
    flex-direction: column;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class SubLayout extends React.Component<Props> {
  private toggleTopMenu = () => {
    const actual = this.props.uiStore!.isTopMenuActive;
    this.props.uiStore!.setIsTopMenuActive(!actual);
  };
  public render() {
    const Nav = this.props.sideContent || null;
    return (
      <React.Fragment>
        <SideMenu>{Nav}</SideMenu>
        <TopMenu
          onClick={this.toggleTopMenu}
          active={this.props.uiStore!.isTopMenuActive}
        >
          <TopNavigation
            activePage={""}
            active={this.props.uiStore!.isTopMenuActive}
          />
        </TopMenu>
        <ProLayout p={this.props.p}>{this.props.children}</ProLayout>
      </React.Fragment>
    );
  }
}

export default SubLayout;
