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
import { Dropdown, Menu } from "antd";
import { ActionButton, ProDropdown } from "../../components/ui/Buttons";
import { TemplateStore } from "../../stores/templateStore";
import { Flex } from "../../components/ui/Flex";

interface Props {
  uiStore?: UiStore;
  reportStore?: ReportStore;
  templateStore?: TemplateStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
  templateStore: allStores.templateStore,
}))
@observer
class OnGoingMenu extends React.Component<Props> {
  componentDidMount() {
    this.props.reportStore!.getReportList();
  }

  public state = {
    selectedTemplateId: "",
    selectedStatus: "Tous les status",
  };

  private filterTemplate = (id?: string) =>
    this.setState({ selectedTemplateId: id });
  private filterStatus = (status?: string) =>
    this.setState({ selectedStatus: status });

  public render() {
    const isReportsLoaded = this.props.uiStore!.isReportsLoaded;
    const templates = this.props.templateStore!.templates;
    let selectedTemplate = this.props.templateStore!.templates.find(
      t => t.id === this.state.selectedTemplateId,
    );
    const selectedTemplateLabel = selectedTemplate
      ? selectedTemplate.label
      : "Tous les templates";
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
                        <Menu.Item
                          key={"template-choice-0"}
                          onClick={() => this.filterTemplate("")}
                        >
                          Tous les templates
                        </Menu.Item>
                        {templates &&
                          templates.map((t, index) => (
                            <Menu.Item
                              key={"template-choice-" + (index + 1)}
                              onClick={() => this.filterTemplate(t.id)}
                            >
                              {t.label}
                            </Menu.Item>
                          ))}
                      </Menu>
                    }
                  >
                    <ActionButton
                      title={selectedTemplateLabel}
                      icon="chevron-down"
                      size="big"
                    />
                  </ProDropdown>
                  <ProDropdown
                    trigger={["click"]}
                    overlay={
                      <Menu style={{ maxWidth: "300px" }}>
                        {[
                          "Tous les status",
                          "new",
                          "warning",
                          "error",
                          "valid",
                        ].map((s, index) => (
                          <Menu.Item
                            key={"status-choice-" + index}
                            onClick={() => this.filterStatus(s)}
                          >
                            {s}
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                  >
                    <ActionButton
                      title={this.state.selectedStatus}
                      icon="chevron-down"
                      size="big"
                      m="0px 5px"
                    />
                  </ProDropdown>
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

export default OnGoingMenu;
