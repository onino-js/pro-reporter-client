import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { EditorStore } from "../../stores/editor.store";
import { Button, Dropdown, Icon, Menu } from "antd";
import styled from "../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReportStore } from "../../stores/report.store";

interface Props extends RouteComponentProps {
  editorStore?: EditorStore;
  reportStore?: ReportStore;
}

const Container = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${props => props.theme.secondary};
  a {
    color: ${props => props.theme.font_secondary};
    line-height: 40px;
    padding-left: 10px;
    padding-right: 10px;
  }
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

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.reportStore.activeReport,
  reportStore: allStores.reportStore,
}))
@observer
class EditorToolbar extends React.Component<Props> {
  private createReport = () => this.props.reportStore!.create();
  private formEditionMode = () => {
    this.props.history.push("/editor/form");
  };
  private templateEditionMode = () => {
    this.props.history.push("/editor/direct");
  };
  private zoomIn = () => this.props.editorStore!.zoomIn();
  private zoomOut = () => this.props.editorStore!.zoomOut();

  private showInputs = () => this.props.editorStore!.showInputs();
  private hideInputs = () => this.props.editorStore!.hideInputs();
  private reset = () => this.props.editorStore!.reset();
  private deleteReport = () =>
    this.props.reportStore!.delete(this.props.editorStore!.id);
  private duplicate = () =>
    this.props.reportStore!.duplicate(this.props.editorStore!.id);

  public render() {
    const isDirectMode = this.props.location.pathname === "/editor/direct";
    const fileMenu = (
      <Menu>
        <MenuItem>
          <div>Enregistrer</div>
          <MenuIcon icon="save" />
        </MenuItem>
        <MenuItem onClick={this.duplicate}>
          <div>Dupliquer</div>
          <MenuIcon icon="clone" />
        </MenuItem>
        <MenuItem>
          <div>Exporter</div>
          <MenuIcon icon="file-export" />
        </MenuItem>
        <MenuItem onClick={this.deleteReport}>
          <div>Supprimer</div>
          <MenuIcon icon="trash" />
        </MenuItem>
        <MenuItem>
          <div>Quitter mode édition</div>
          <MenuIcon icon="door-open" />
        </MenuItem>
      </Menu>
    );
    const displayMenu = (
      <Menu>
        <MenuItem onClick={this.formEditionMode} disabled={!isDirectMode}>
          <div>Mode formulaire</div>
        </MenuItem>
        <MenuItem onClick={this.templateEditionMode} disabled={isDirectMode}>
          <div>Mode template</div>
        </MenuItem>
        <MenuItem onClick={this.zoomIn} disabled={!isDirectMode}>
          Zoom in
          <MenuIcon icon="plus" />
        </MenuItem>
        <MenuItem onClick={this.zoomOut} disabled={!isDirectMode}>
          Zoom out
          <MenuIcon icon="minus" />
        </MenuItem>
      </Menu>
    );
    const fieldMenu = (
      <Menu>
        <MenuItem onClick={this.showInputs}>
          <div>Montrer les champs</div>
        </MenuItem>
        <MenuItem onClick={this.hideInputs}>
          <div>Masquer les champs</div>
        </MenuItem>
        <MenuItem>
          <div>Récupérer</div>
        </MenuItem>
        <MenuItem onClick={this.reset}>
          <div>Vider</div>
        </MenuItem>
      </Menu>
    );
    return (
      <Container>
        <a onClick={this.createReport}>
          Nouveau <Icon type="plus" />
        </a>
        <Dropdown overlay={fileMenu}>
          <a className="ant-dropdown-link" href="#">
            Fichier <Icon type="down" />
          </a>
        </Dropdown>
        <Dropdown overlay={fieldMenu}>
          <a className="ant-dropdown-link" href="#">
            Champs <Icon type="down" />
          </a>
        </Dropdown>
        <Dropdown overlay={displayMenu}>
          <a className="ant-dropdown-link" href="#">
            Affichage <Icon type="down" />
          </a>
        </Dropdown>
      </Container>
    );
  }
}

export default withRouter(EditorToolbar);
