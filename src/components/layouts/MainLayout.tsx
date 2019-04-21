import * as React from "react";
import { Layout } from "antd";
import MainHeader from "./MainHeader";

interface Props {
  // uiStore?: UiStore;
}

class MainLayout extends React.Component<Props> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <MainHeader />
        <div style={{ display: "flex", flex: 1 }}>{this.props.children}</div>
      </div>
    );
  }
}

export default MainLayout;
