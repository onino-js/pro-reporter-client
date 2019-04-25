import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Report } from "../../stores/report";
import { Dropdown, Icon, Menu } from "antd";
import styled from "../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReportStore } from "../../stores/report.store";
import {
  createProcess,
  startProcess,
} from "../../services/cloud-converter.service";
import { saveAs } from "file-saver";
import DuplicateModal from "./editor-modals/DuplicateModal";
import { UiStore } from "../../stores/ui.store";
import { Button } from "antd/lib/radio";
import { Flex } from "../../components/ui/Flex";
import { deleteAllActiveReports } from "../../services/firebase.srevice";
import { AuthStore } from "../../stores/auth.store";
import { _measures } from "../../assets/styles/_measures";
import { FirebaseStore } from "../../stores/firebaseStore";

interface Props extends RouteComponentProps {
  Report?: Report;
  reportStore?: ReportStore;
  uiStore?: UiStore;
  authStore?: AuthStore;
  firebaseStore?: FirebaseStore;
}

const Container = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme.secondary};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1em;
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionLink = styled.span`
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
`;

const ProDropdown: any = styled(Dropdown).attrs({
  trigger: ["hover", "click"],
})`
  height: 100%;
  line-height: 40px;
`;

const SyncButtton = styled(Button)`
  border: none;
  outline: none;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.font_secondary};
  :hover {
    color: ${props => props.theme.primary};
  }
`;

const TemplateDropdown = styled(ProDropdown)`
  color: ${(props: any) => props.theme.secondary};
  background-color: ${(props: any) => props.theme.disabled};
  padding: 0px 10px;
  margin: 0px;
  font-weight: bolder;
`;

const LeftWrapperPc = styled(Flex)`
  @media (max-width: ${_measures.mobile}px) {
    display: none;
  }
`;

const LeftWrapperMobile = styled(Flex)`
  padding-left: 10px;
  color: ${props => props.theme.bg_primary};
  @media (min-width: ${_measures.mobile}px) {
    display: none;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  Report: allStores.reportStore.activeReport,
  reportStore: allStores.reportStore,
  authStore: allStores.authStore,
  firebaseStore: allStores.firebaseStore,
}))
@observer
class EditorToolbar extends React.Component<Props> {
  private formEditionMode = () => {
    this.props.reportStore!.setEditionMode("form");
  };
  private templateEditionMode = () => {
    this.props.reportStore!.setEditionMode("direct");
  };
  private zoomIn = () => this.props.reportStore!.zoomIn();
  private zoomOut = () => this.props.reportStore!.zoomOut();

  private hightlight = () => {
    if (this.props.reportStore!.fieldHighlighted) {
      this.props.reportStore!.setFieldHighlighted(false);
      this.props.reportStore!.hideInputs();
    } else {
      this.props.reportStore!.setFieldHighlighted(true);
      this.props.reportStore!.renderContainers();
    }
  };

  private reset = () => this.props.reportStore!.reset();
  private deleteReport = () =>
    this.props.reportStore!.delete(this.props.Report!.id);

  private duplicate = () => this.props.reportStore!.duplicate();

  private exportReportSvg = async () => {
    const svg = this.props.reportStore!.getSvg();
    var blob = new Blob([svg], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "test.svg");
  };

  private exportReportPdf = async () => {
    const svg = this.props.reportStore!.getSvg();
    // const res = await startConvertion(svg);
    const res = await createProcess();
    res && console.log(res);
    // const res2 = await startProcess(res.url, svg)
    // console.log(res2)
  };

  private customDuplicateRequest = () =>
    this.props.uiStore!.showModal("duplicate");

  private synchronize = () => {
    this.props.firebaseStore!.synchronize();
  };

  private deleteAll = () => {
    deleteAllActiveReports(this.props.authStore!.userId);
  };

  private empty = () => {
    deleteAllActiveReports(this.props.authStore!.userId);
  };

  private showLoadReportModal = () => {
    this.props.uiStore!.showModal("load-report");
  };

  private exit = () => {
    this.props.history.push("/");
  };

  public render() {
    const editionMode = this.props.reportStore!.editionMode;
    const isEditedReport = this.props.reportStore!.activeReport !== null;
    const fileMenu = (
      <Menu>
        <MenuItem onClick={this.showLoadReportModal}>
          <div>Charger</div>
          <MenuIcon icon="download" />
        </MenuItem>
        <MenuItem disabled={!isEditedReport}>
          <div>Exporter</div>
          <MenuIcon icon="file-export" />
        </MenuItem>
        <MenuItem disabled={!isEditedReport}>
          <div>Importer</div>
          <MenuIcon icon="file-export" />
        </MenuItem>
        <MenuItem onClick={this.empty}>
          <div>Vider l'éditeur</div>
          <MenuIcon icon="trash" />
        </MenuItem>
        <MenuItem onClick={this.deleteAll}>
          <div>Supprimer les rapports</div>
          <MenuIcon icon="trash" />
        </MenuItem>
        <MenuItem onClick={this.exit}>
          <div>Quitter mode édition</div>
          <MenuIcon icon="door-open" />
        </MenuItem>
      </Menu>
    );

    const reportMenu = (
      <Menu>
        <MenuItem onClick={this.duplicate} disabled={!isEditedReport}>
          <div>Dupliquer le rapport</div>
          <MenuIcon icon="clone" />
        </MenuItem>
        <MenuItem
          onClick={this.customDuplicateRequest}
          disabled={!isEditedReport}
        >
          <div>Dupliquer custom</div>
          <MenuIcon icon="clone" />
        </MenuItem>
        <MenuItem disabled={!isEditedReport}>
          <div>Cloner les champs</div>
        </MenuItem>
        <MenuItem onClick={this.exportReportSvg} disabled={!isEditedReport}>
          <div>Exporter svg</div>
          <MenuIcon icon="file-export" />
        </MenuItem>
        <MenuItem onClick={this.exportReportPdf} disabled={!isEditedReport}>
          <div>Exporter pdf</div>
          <MenuIcon icon="file-export" />
        </MenuItem>
        <MenuItem onClick={this.deleteReport} disabled={!isEditedReport}>
          <div>Supprimer</div>
          <MenuIcon icon="trash" />
        </MenuItem>

        <MenuItem onClick={this.reset}>
          <div>Vider les champs</div>
        </MenuItem>
      </Menu>
    );
    const displayMenu = (
      <Menu>
        <MenuItem
          onClick={this.formEditionMode}
          disabled={editionMode === "form"}
        >
          <div>Mode formulaire</div>
        </MenuItem>
        <MenuItem
          onClick={this.templateEditionMode}
          disabled={editionMode === "direct"}
        >
          <div>Mode template</div>
        </MenuItem>
        <MenuItem
          onClick={this.hightlight}
          disabled={editionMode === "form" || !isEditedReport}
        >
          {this.props.reportStore!.fieldHighlighted ? "Masquer" : "Montrer"} les
          champs
          <MenuIcon
            icon={
              !this.props.reportStore!.fieldHighlighted ? "eye" : "eye-slash"
            }
          />
        </MenuItem>
        <MenuItem onClick={this.zoomIn} disabled={editionMode === "form"}>
          Zoom in
          <MenuIcon icon="plus" />
        </MenuItem>
        <MenuItem onClick={this.zoomOut} disabled={editionMode === "form"}>
          Zoom out
          <MenuIcon icon="minus" />
        </MenuItem>
      </Menu>
    );
    return (
      <Container>
        <LeftWrapperPc>
          <ProDropdown overlay={fileMenu}>
            <ActionLink>
              Fichiers <Icon type="down" />
            </ActionLink>
          </ProDropdown>
          <ProDropdown overlay={reportMenu}>
            <ActionLink>
              Rapport <Icon type="down" />
            </ActionLink>
          </ProDropdown>
          <ProDropdown overlay={displayMenu}>
            <ActionLink>
              Affichage <Icon type="down" />
            </ActionLink>
          </ProDropdown>
        </LeftWrapperPc>
        <LeftWrapperMobile>
          <FontAwesomeIcon icon="ellipsis-h" />
        </LeftWrapperMobile>
        <Flex alignH="flex-end" p="0px 5px 0px 0px">
          <SyncButtton onClick={this.synchronize}>SYNCHRONISER </SyncButtton>
        </Flex>
        <DuplicateModal />
      </Container>
    );
  }
}

export default withRouter(EditorToolbar);
