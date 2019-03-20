import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { Button } from "antd/lib/radio";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";

interface Props {
  uiStore?: any;
}
class Contacts extends React.Component<Props> {
  public state = {
    activeItemIndex: 0,
  };

  public render() {
    return (
      <MainLayout>
        <SubLayout
          activePage="contacts"
          sideContent={<SideNavigation activePage={"contacts"} />}
        >
          <React.Fragment>Contacts</React.Fragment>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default Contacts;
