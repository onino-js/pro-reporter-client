import * as React from "react";
import { Layout } from "antd";
import MainHeader from "./MainHeader";

interface Props {
  // uiStore?: UiStore;
}

class MainLayout extends React.Component<Props> {
  public render() {
    return (
      <Layout tagName="main" style={{ height: "100vh", overflow: "hidden" }}>
        <MainHeader />
        <div style={{ display: "flex", flex: 1 }}>{this.props.children}</div>
      </Layout>
    );
  }
}

export default MainLayout;
