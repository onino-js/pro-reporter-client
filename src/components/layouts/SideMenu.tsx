import * as React from "react";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { palette } from "../../assets/styles/_colors";
import { _measures } from "../../assets/styles/_measures";
import bigLogo from "../../assets/images/big-logo.png";

interface Props {
  // uiStore?: UiStore;
  activePage: string;
}

const menuItems = [
  {
    title: "Tableau de bord",
    icon: "tachometer-alt",
    color: "transparent",
    page: "dashboard",
  },
  {
    title: "Contact",
    icon: "users",
    color: "transparent",
    page: "contact",
  },
];

const Container = styled.div`
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

class SideMenu extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <MainMenuButton>
          <FontAwesomeIcon icon="plus" style={{ fontSize: "1.6em" }} />
          <div style={{ paddingLeft: "20px" }}>NOUVEAU RAPPORT</div>
        </MainMenuButton>
        <Menu>
          {menuItems.map((item: any, index) => (
            <MenuItem
              key={"menu-item" + index}
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
      </Container>
    );
  }
}

export default SideMenu;
