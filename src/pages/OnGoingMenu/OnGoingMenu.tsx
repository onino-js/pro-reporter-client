import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { ProContainer } from "../../components/layouts/ProContainer";
import OnGoingList from "./OnGoingList";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import LoadingZone from "../../components/ui/LoadingZone";
import { ReportStore } from "../../stores/report.store";

interface Props {
  uiStore?: UiStore;
  reportStore?: ReportStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class OnGoingMenu extends React.Component<Props> {
  componentDidMount() {
    this.props.reportStore!.getReportList();
  }

  public render() {
    const isReportsLoaded = this.props.uiStore!.isReportsLoaded;
    return (
      <MainLayout>
        <SubLayout
          activePage="contacts"
          sideContent={<SideNavigation activePage={"on-going"} />}
        >
          <ProContainer>
            {isReportsLoaded ? (
              <OnGoingList />
            ) : (
              <LoadingZone message="Chargement des documents en cours" />
            )}
          </ProContainer>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default OnGoingMenu;
