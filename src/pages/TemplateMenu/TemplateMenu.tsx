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
      this.props.uiStore!.setLoadingState("templates", true),
    );
  }
  private closeNewTemplate = () => {
    this.props.uiStore!.hideModal("new-template");
  };
  private importTemplateRequest = () => {
    this.props.uiStore!.showModal("new-template");
  };
  private newTemplateRequest = () => {
    this.props.uiStore!.setInProgressMessage(
      <React.Fragment>
        <p key="msg-inprogess-1">
          Cette fonctionnalité vous permettra de construire vos template à
          partir d'une interface en ligne et optimisée pour une création simple
          et intuitive. En attendant, vous avez le choix de faire faire vos
          templates par la société Onino.js, ou bien créez vos templates à avec
          un éditeur de svg comme Adobe illustrator ou Inkscape.
        </p>
        <p key="msg-inprogess-2">
          Cette fonctionnalité vous importe ? Supportez nous en parlant de
          PROREPORTER autour de vous et accélerez la croissance du produit :).
        </p>
      </React.Fragment>,
    );
    this.props.uiStore!.showModal("in-progress");
  };

  public render() {
    const templatesLoaded = this.props.uiStore!.loadingState["templates"];
    return (
      <MainLayout>
        <SubLayout
          activePage="dashboard"
          sideContent={<SideNavigation activePage={"templates"} />}
        >
          <ProContainer>
            <Flex>
              <ActionButton
                title="Importer template"
                icon="file-import"
                onClick={this.importTemplateRequest}
                // size="big"
                m="0px 10px 0px 0px"
              />
              <ActionButton
                title="Créer template"
                icon="plus"
                onClick={this.newTemplateRequest}
                // size="big"
              />
            </Flex>
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
