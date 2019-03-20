import * as React from "react";
import { Layout, Menu, Breadcrumb, Icon, Tabs, Badge, Button } from "antd";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// import { inject, observer } from "mobx-react";

interface Props {
  uiStore?: any;
}

const TabPane = Tabs.TabPane;

class Ongoing extends React.Component<Props> {
  public state = {
    isLoading: false,
  };
  private addBail = () => {
    this.setState({ isLoading: true });
  };

  public render() {
    return (
      <React.Fragment>
        <Button
          type="primary"
          icon="poweroff"
          loading={this.state.isLoading}
          onClick={this.addBail}
        >
          Ajouter un bail
        </Button>
      </React.Fragment>
    );
  }
}

export default Ongoing;
