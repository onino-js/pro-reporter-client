import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { ProContainer } from "../../components/layouts/ProContainer";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import LoadingZone from "../../components/ui/LoadingZone";
import { Menu } from "antd";
import { ActionButton, ProDropdown } from "../../components/ui/Buttons";
import { TemplateStore } from "../../stores/templateStore";
import { Flex } from "../../components/ui/Flex";
import { ReportFilterStatusButton } from "../../components/items/ReportFilterStatusButton";
import { Istatus } from "../../models/app.models";
import TemplateChoiceButton from "../../components/items/TemplateChoiceButton";
import { Itemplate } from "../../models/template.model";
import { withRouter, RouteComponentProps } from "react-router";
import ArchivesList from "./ArchivesList";
import { ArchiveStore } from "../../stores/archive.store";
import TopNavigation from "../../components/navigation/TopNavigation";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  archiveStore?: ArchiveStore;
  templateStore?: TemplateStore;
}

interface State {
  selectedTemplateId: string | null;
  selectedStatus: Istatus | null;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  archiveStore: allStores.archiveStore,
  templateStore: allStores.templateStore,
}))
@observer
class Archives extends React.Component<Props, State> {
  componentDidMount() {
    this.props.archiveStore!.getArchiveList();
  }

  public state = {
    selectedTemplateId: "",
    selectedStatus: null,
  };

  private filterTemplate = (id: string | null) =>
    this.setState({ selectedTemplateId: id });

  private filterStatus = (status: Istatus | null) =>
    this.setState({ selectedStatus: status });

  public render() {
    const isArchivesLoaded = this.props.uiStore!.loadingState["archives"];
    const templates = this.props.templateStore!.templates;
    return (
      <MainLayout>
        <SubLayout
          activePage="contacts"
          sideContent={<SideNavigation activePage={"archives"} />}
        >
          <ProContainer>
            {isArchivesLoaded ? (
              <React.Fragment>
                <Flex>
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
                <ArchivesList
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

export default withRouter(Archives);
