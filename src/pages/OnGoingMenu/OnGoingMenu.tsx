import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { ProContainer } from "../../components/layouts/ProContainer";
import OnGoingList from "./OnGoingList";
import { inject } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";

interface Props {
  uiStore?: any;
}


class OnGoingMenu extends React.Component<Props> {
  componentDidMount() {}

  public render() {
    return (
      <MainLayout>
        <SubLayout
          activePage="contacts"
          sideContent={<SideNavigation activePage={"on-going"} />}
        >
          <ProContainer>
            <OnGoingList />
          </ProContainer>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default OnGoingMenu;
