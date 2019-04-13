import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { ProContainer } from "../../components/layouts/ProContainer";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import SelectTemplate from "./SelectTemplate";
import ReportList from "./ReportList";

interface Props extends RouteComponentProps {
  uiStore?: any;
  reportStore: ReportStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class Dashboard extends React.Component<Props> {
  public state = {
    selectedTemplateId: null,
  };

  componentDidMount() {}

  public render() {
    return (
      <MainLayout>
        <SubLayout
          activePage="dashboard"
          sideContent={<SideNavigation activePage={"dashboard"} />}
        >
          <ProContainer>
            {this.props.reportStore!.reports.length === 0 ? (
              <SelectTemplate />
            ) : (
              <ReportList />
            )}
          </ProContainer>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default withRouter(Dashboard);
