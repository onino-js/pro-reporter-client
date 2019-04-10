import * as React from "react";
import styled from "../../../styled-components";
import { _measures } from "../../../assets/styles/_measures";
import { withRouter, RouteComponentProps } from "react-router";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { UiStore } from "../../../stores/ui.store";

interface Props extends RouteComponentProps {
  activeSectionIndex: number;
  setActiveSectionIndex: any;
  uiStore?: UiStore;
  menuItems: any[];
}

const MenuItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  color: #000;
  :hover {
    background-color: #ccc;
    cursor: pointer;
  }
  .gi-menu-icon {
    font-size: 1.2em;
  }
  &.active {
    /* color: ${props => props.theme.primary}; */
    background-color: #000;
    color: #fff;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  @media (max-width: ${_measures.tablet}px) {
    width: 200px;
    font-size: 0.8em;
  }
`;

const MenuItemTitle = styled.span`
  padding-left: 20px;
  display: flex;
  flex: 1;
  letter-spacing: 5px;
  font-weight: bolder;
  /* @media (max-width: ${_measures.tablet}px) {
    display: none;
  } */
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  isLogged: allStores.uiStore.isLogged,
}))
@observer
class StepNavigation extends React.Component<Props> {
  public render() {
    return (
      <Menu>
        {this.props.menuItems.map((item: any, index: number) => (
          <MenuItem
            key={"menu-item" + index}
            onClick={() => this.props.setActiveSectionIndex(index)}
            className={`${
              this.props.activeSectionIndex === index ? "active" : ""
            }`}
          >
            {/* <IconBox color={item.color}>
                <FontAwesomeIcon className="gi-menu-icon" icon={item.icon} />
              </IconBox> */}
            <MenuItemTitle>{item.label.toUpperCase()}</MenuItemTitle>
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default withRouter(StepNavigation);
