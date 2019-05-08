import * as React from "react";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _measures } from "../../assets/styles/_measures";
import { withRouter, RouteComponentProps } from "react-router";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  activePage: string;
  active: boolean;
}

interface ImenuItem {
  title: string;
  icon: IconProp;
  color: string;
  page: string;
}

const menuItems: ImenuItem[] = [
  {
    title: "Tableau de bord",
    icon: "tachometer-alt",
    color: "transparent",
    page: "dashboard",
  },
  {
    title: "En cours",
    icon: "hard-hat",
    color: "transparent",
    page: "on-going",
  },
  {
    title: "Templates",
    icon: "file-image",
    color: "transparent",
    page: "templates",
  },
  {
    title: "Archives",
    icon: "archive",
    color: "transparent",
    page: "archives",
  },
  {
    title: "Contacts",
    icon: "users",
    color: "transparent",
    page: "contacts",
  },
  {
    title: "Stockage cloud",
    icon: "box-open",
    color: "transparent",
    page: "cloud-storage",
  },
  {
    title: "Base de données",
    icon: "database",
    color: "transparent",
    page: "database",
  },
  {
    title: "Statistiques",
    icon: "chart-pie",
    color: "transparent",
    page: "statistics",
  },
  {
    title: "Editeur",
    icon: "pen-fancy",
    color: "transparent",
    page: "editor/direct",
  },
];

const Container: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  display: none;
  flex-direction: column;
  flex-shrink: "0";
  &.active {
    display: flex;
  }
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 30px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  color: #fff;
  :hover {
    background-color: #ccc;
    cursor: pointer;
  }
  .gi-menu-icon {
    font-size: 12px;
  }
  &.active {
    background-color: #000;
  }
`;

const MenuItemTitle = styled.span`
  padding-left: 10px;
  display: flex;
  flex: 1;
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
class TopNavigation extends React.Component<Props> {
  private goTo = (page: string) => {
    this.props.history.push(page);
  };
  public render() {
    return (
      <Container active={this.props.active}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={"menu-item" + index}
            onClick={() => this.goTo("/" + item.page)}
            className={`${this.props.activePage === item.page ? "active" : ""}`}
          >
            <MenuItemTitle>{item.title}</MenuItemTitle>
            <IconBox color={item.color}>
              <FontAwesomeIcon className="gi-menu-icon" icon={item.icon} />
            </IconBox>
          </MenuItem>
        ))}
      </Container>
    );
  }
}

export default withRouter(TopNavigation);
