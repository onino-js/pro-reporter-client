import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { ProContainer } from "../../components/layouts/ProContainer";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import TemplateList from "./TemplateList";
import { TemplateStore } from "../../stores/templateStore";
import { Flex } from "../../components/ui/Flex";
import { AuthStore } from "../../stores/auth.store";
import { UiStore } from "../../stores/ui.store";
import { SpiralSpinner } from "react-spinners-kit";
import { mainTheme } from "../../assets/styles/_colors";
import NewTemplate from "../../components/modals/NewTemplate";
import { ActionButton } from "../../components/ui/Buttons";
import TemplateInfoModal from "../../components/modals/TemplateInfoModal";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  reportStore?: ReportStore;
  templateStore?: TemplateStore;
  authStore?: AuthStore;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
  templateStore: allStores.templateStore,
  authStore: allStores.authStore,
}))
@observer
class TemplateMenu extends React.Component<Props> {
  public state = {
    selectedTemplateId: null,
  };
  componentDidMount() {
    this.props.templateStore!.getTemplates(() =>
      this.props.uiStore!.setIsTemplatesLoaded(true),
    );
  }
  private closeNewTemplate = () => {
    this.props.uiStore!.hideModal("new-template");
  };

  private newTemplateRequest = () => {
    this.props.uiStore!.showModal("new-template");
  };

  public render() {
    const templatesLoaded = this.props.uiStore!.isTemplatesLoaded;
    return (
      <MainLayout>
        <SubLayout
          activePage="dashboard"
          sideContent={<SideNavigation activePage={"templates"} />}
        >
          <ProContainer>
            <div>
              <ActionButton
                title="Importer template"
                icon="plus"
                onClick={this.newTemplateRequest}
                size="big"
              />
            </div>
            {templatesLoaded ? (
              <TemplateList />
            ) : (
              <Flex alignH="center" alignV="center" flex={1}>
                <SpiralSpinner
                  size={100}
                  frontColor={mainTheme.secondary}
                  loading={true}
                />
              </Flex>
            )}
            <NewTemplate
              show={this.props.uiStore!.showNewTemplate}
              close={this.closeNewTemplate}
              onOk={this.closeNewTemplate}
            />
          </ProContainer>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default withRouter(TemplateMenu);
