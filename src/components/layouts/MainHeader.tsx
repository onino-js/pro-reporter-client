import * as React from "react";
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from "antd";
import styled from "../../styled-components";
import SubLayout from "./SubLayout";
import DropdownButton from "antd/lib/dropdown/dropdown-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "../../services/firebase.srevice";
import { inject, observer, Provider } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import logo from "../../assets/images/LOGO_PROREPORTER_light.png";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// import { inject, observer } from "mobx-react";

interface Props {
  uiStore?: UiStore;
  isLogged?: boolean;
}

const Logo = styled.div`
  width: auto;
  padding-left: 20px;
  padding-right: 50px;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #000;
  background: "transparent";
  display: flex;
  justify-content: space-between;
  padding: 0;
`;

const Band1: any = styled.div`
  position: absolute;
  top: ${(props: any) => props.n * 10}px;
  z-index: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(50, 50, 50, 1) 100%
  );
  padding: 0;
`;

const Band2: any = Band1.extend`
  top: ${(props: any) => props.n * 10}px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 50%,
    rgba(20, 20, 20, 1) 100%
  );
`;

const HeaderButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  border: none;
  height: 100%;
  padding-right: 20px;
  padding-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: ${props => props.theme.font_secondary};
  .gi-icon {
    margin-left: 10px;
  }
`;

const RightBox = styled.div`
  z-index: 100;
  height: 100%;
  display: flex;
`;
const LeftBox = styled.div`
  z-index: 100;
  height: 100%;
  display: flex;
`;

const Conected = styled.div`
  height: 50%;
  width: 80%;
`;

const UserMenu = ({ onClick }: { onClick: () => void }) => (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item onClick={onClick}>Se déconnecter</Menu.Item>
  </Menu>
);

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  isLogged: allStores.uiStore.isLogged,
}))
@observer
class MainHeader extends React.Component<Props> {
  private signOut = () => {
    this.props.uiStore!.setIsLogged(false);
    signOut();
  };
  public render() {
    return (
      <Container>
        <RightBox>
          <Logo>
            <img src={logo} width="150px" />
          </Logo>
          <HeaderButton>
            LEXIQUE <FontAwesomeIcon icon="book-open" className="gi-icon" />
          </HeaderButton>
          <HeaderButton>
            AIDE <FontAwesomeIcon icon="question-circle" className="gi-icon" />
          </HeaderButton>
        </RightBox>
        <LeftBox>
          <Dropdown
            overlay={<UserMenu onClick={this.signOut} />}
            placement="bottomRight"
          >
            <HeaderButton>
              <Conected> Connecté</Conected>
              <div>
                <div>seba.pinard@gmail.com</div>
              </div>
            </HeaderButton>
          </Dropdown>
        </LeftBox>
        <Band1 n={0} />
        <Band2 n={1} />
        <Band1 n={2} />
        <Band2 n={3} />
        <Band1 n={4} />
        <Band2 n={5} />
      </Container>
    );
  }
}

export default MainHeader;
