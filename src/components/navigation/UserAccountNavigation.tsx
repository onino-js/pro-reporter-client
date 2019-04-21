import * as React from "react";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _measures } from "../../assets/styles/_measures";
import { withRouter, RouteComponentProps } from "react-router";
import NewReport from "../modals/NewReport";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  activePage: string;
}

const menuItems = [
  {
    title: "Informations",
    icon: "question-circle",
    color: "transparent",
    page: "user-informations",
  },
  {
    title: "Abonnement",
    icon: "file-signature",
    color: "transparent",
    page: "user-plan",
  },
  {
    title: "Facturation",
    icon: "euro-sign",
    color: "transparent",
    page: "user-billing",
  },
  {
    title: "Paramètres",
    icon: "cogs",
    color: "transparent",
    page: "user-settings",
  },
];

const MenuItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  color: #fff;
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
  }
`;

const MainMenuButton = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  color: #fff;
  /* flex-direction: column; */
  justify-content: center;
  cursor: pointer;
  /* border-bottom: 1px solid #fff; */
  :hover {
    color: ${props => props.theme.primary};
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItemTitle = styled.span`
  padding-left: 20px;
  display: flex;
  flex: 1;
  @media (max-width: ${_measures.tablet}px) {
    display: none;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${props => props.color};
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  isLogged: allStores.authStore.isLogged,
}))
@observer
class UserAccountNavigation extends React.Component<Props> {
  private goTo = (page: string) => {
    this.props.history.push(page);
  };
  public render() {
    return (
      <React.Fragment>
        {/* <MainMenuButton
          onClick={() => this.props.uiStore!.setState("showNewReport", true)}
        >
          <FontAwesomeIcon icon="plus" style={{ fontSize: "1.6em" }} />
          <div style={{ paddingLeft: "20px" }}>NOUVEAU RAPPORT</div>
        </MainMenuButton> */}
        <NewReport />
        <Menu>
          {menuItems.map((item: any, index) => (
            <MenuItem
              key={"menu-item" + index}
              onClick={() => this.goTo("/" + item.page)}
              className={`${
                this.props.activePage === item.page ? "active" : ""
              }`}
            >
              <IconBox color={item.color}>
                <FontAwesomeIcon className="gi-menu-icon" icon={item.icon} />
              </IconBox>
              <MenuItemTitle>{item.title}</MenuItemTitle>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withRouter(UserAccountNavigation);
