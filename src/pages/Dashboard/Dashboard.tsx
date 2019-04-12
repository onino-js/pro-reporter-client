import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { checkTemplate } from "../../services/template.service";
import { template } from "../../assets/static-data/templates/gaz-linking-1";

interface Props {
  uiStore?: any;
}
class Dashboard extends React.Component<Props> {
  public state = {
    activeItemIndex: 0,
  };

  componentDidMount() {
    const res = checkTemplate(template);
    console.log(res);
  }

  public render() {
    return (
      <MainLayout>
        <SubLayout
          activePage="dashboard"
          sideContent={<SideNavigation activePage={"dashboard"} />}
        >
          <React.Fragment>bley</React.Fragment>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default Dashboard;
