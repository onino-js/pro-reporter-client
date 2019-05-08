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
import { Menu } from "antd";
import { ActionButton, ProDropdown } from "../../components/ui/Buttons";
import { TemplateStore } from "../../stores/templateStore";
import { Flex } from "../../components/ui/Flex";
import { ReportFilterStatusButton } from "../../components/items/ReportFilterStatusButton";
import { Istatus } from "../../models/app.models";
import TemplateChoiceButton from "../../components/items/TemplateChoiceButton";
import { Itemplate } from "../../models/template.model";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  reportStore?: ReportStore;
  templateStore?: TemplateStore;
}

interface State {
  selectedTemplateId: string | null;
  selectedStatus: Istatus | null;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
  templateStore: allStores.templateStore,
}))
@observer
class OnGoingMenu extends React.Component<Props, State> {
  componentDidMount() {
    this.props.reportStore!.getReportList();
  }

  public state = {
    selectedTemplateId: "",
    selectedStatus: null,
  };

  private filterTemplate = (id: string | null) =>
    this.setState({ selectedTemplateId: id });

  private filterStatus = (status: Istatus | null) =>
    this.setState({ selectedStatus: status });

  private createNewReport = (template: Itemplate) => {
    this.props.reportStore!.setTemplate(template);
    const id = this.props.reportStore!.create(template);
    this.props.history.push(`editor/direct${id}`);
  };

  public render() {
    const isReportsLoaded = this.props.uiStore!.loadingState["reports"];
    const templates = this.props.templateStore!.templates;
    return (
      <MainLayout>
        <SubLayout
          activePage="contacts"
          sideContent={<SideNavigation activePage={"on-going"} />}
        >
          <ProContainer>
            {isReportsLoaded ? (
              <React.Fragment>
                <Flex>
                  <ProDropdown
                    trigger={["click"]}
                    overlay={
                      <Menu style={{ maxWidth: "300px" }}>
                        {templates &&
                          templates.map((t, index) => (
                            <Menu.Item
                              key={"template-choice-" + (index + 1)}
                              onClick={() => this.createNewReport(t)}
                            >
                              {t.label}
                            </Menu.Item>
                          ))}
                      </Menu>
                    }
                  >
                    <ActionButton
                      title={"Nouveau rapport"}
                      icon="plus"
                     // size="big"
                    />
                  </ProDropdown>
                  <Flex m="0px 10px" alignV="center">
                    Filtres :
                  </Flex>
                  <TemplateChoiceButton
                    filterTemplate={this.filterTemplate}
                    selectedTemplateId={this.state.selectedTemplateId}
                  />
                  <ReportFilterStatusButton
                    selectedStatus={this.state.selectedStatus}
                    filterStatus={this.filterStatus}
                  />
                </Flex>
                <OnGoingList
                  templateFilter={this.state.selectedTemplateId}
                  statusFilter={this.state.selectedStatus}
                />
              </React.Fragment>
            ) : (
              <LoadingZone message="Chargement des documents en cours" />
            )}
          </ProContainer>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default withRouter(OnGoingMenu);
