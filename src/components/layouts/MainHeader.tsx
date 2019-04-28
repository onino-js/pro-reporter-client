import * as React from "react";
import { Menu, Dropdown } from "antd";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inject, observer, Provider } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import logo from "../../assets/images/LOGO_PROREPORTER_light.png";
import { withRouter, RouteComponentProps } from "react-router";
import InfoModal from "../modals/InfoModal";
import { _measures } from "../../assets/styles/_measures";
import { AuthStore } from "../../stores/auth.store";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  authStore?: AuthStore;
  isLogged?: boolean;
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #000;
  background: "transparent";
  display: flex;
  justify-content: space-between;
  padding: 0;
  @media (max-width: ${_measures.mobile}px) {
    height: 40px;
  }
`;

const LogoBox = styled.div`
  width: auto;
  padding-left: 5px;
  padding-right: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  width: auto;
  height: 50px;
  @media (max-width: ${_measures.mobile}px) {
    height: 35px;
  }
`;

const Band1: any = styled.div`
  width: 100%;
  height: 10%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(50, 50, 50, 1) 100%
  );
  padding: 0;
`;
const Band2: any = styled.div`
  width: 100%;
  height: 10%;
  background: rgba(0, 0, 0, 1);
  padding: 0;
`;

const HeaderButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  border: none;
  height: 100%;
  min-width: 60px;
  padding-right: 20px;
  padding-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: ${props => props.theme.font_secondary};
  .gi-icon {
    margin-left: 10px;
  }
  @media (max-width: ${_measures.mobile}px) {
    padding-right: 10px;
    padding-left: 10px;
    width: 40px;
    min-width: 40px;
  }
`;

const RightBox = styled.div`
  height: 100%;
  display: flex;
`;
const LeftBox = styled.div`
  height: 100%;
  display: flex;
`;
const MiddleBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const Text = styled.span`
  margin-right: 10px;
  @media (max-width: ${_measures.mobile}px) {
    display: none;
  }
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  /* justify-content: space-between; */
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  isLogged: allStores.authStore.isLogged,
  authStore: allStores.authStore,
}))
@observer
class MainHeader extends React.Component<Props> {
  private signOut = () => {
    this.props.authStore!.signout();
    // this.props.authStore!.setIsLogged(false);
  };
  private goHome = () => {
    this.props.history.push("/");
  };
  private goToUserPage = () => {
    this.props.history.push("/user-informations");
  };
  private showInfoModal = () => this.props.uiStore!.showModal("info");
  private closeInfoModal = () => this.props.uiStore!.hideModal("info");

  public render() {
    const UserMenu = () => (
      <Menu style={{ width: "170px" }}>
        <MenuItem onClick={this.goToUserPage}>
          <FontAwesomeIcon
            icon="user-circle"
            // style={{ margin: "auto 10px auto 0px" }}
          />
          Mon compte
        </MenuItem>
        <MenuItem onClick={this.signOut}>
          <FontAwesomeIcon
            icon="sign-out-alt"
            // style={{ margin: "auto 10px auto 0px" }}
          />
          Se déconnecter
        </MenuItem>
      </Menu>
    );
    return (
      <Container>
        <RightBox>
          <LogoBox onClick={this.goHome}>
            <Logo src={logo} />
          </LogoBox>
          {/* <HeaderButton>
            LEXIQUE <FontAwesomeIcon icon="book-open" className="gi-icon" />
          </HeaderButton>
          <HeaderButton>
            AIDE <FontAwesomeIcon icon="question-circle" className="gi-icon" />
          </HeaderButton> */}
        </RightBox>
        <MiddleBox>
          <Band1 n={0} />
          <Band2 n={1} />
          <Band1 n={2} />
          <Band2 n={3} />
          <Band1 n={4} />
          <Band2 n={5} />
          <Band1 n={6} />
          <Band2 n={7} />
          <Band1 n={8} />
          <Band2 n={9} />
          <Band1 n={10} />
        </MiddleBox>
        <LeftBox>
          <HeaderButton onClick={this.showInfoModal}>
            <Text>A propos</Text>
            <FontAwesomeIcon icon="question-circle" />
          </HeaderButton>
          <Dropdown overlay={<UserMenu />} placement="bottomRight">
            <HeaderButton>
              <FontAwesomeIcon icon="user" />
            </HeaderButton>
          </Dropdown>
        </LeftBox>

        <InfoModal
          show={this.props.uiStore!.showInfoModal}
          close={this.closeInfoModal}
        />
      </Container>
    );
  }
}

export default withRouter(MainHeader);
