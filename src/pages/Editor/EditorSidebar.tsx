import * as React from "react";
import styled from "../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { UiStore } from "../../stores/ui.store";
import { Report } from "../../stores/report";
import { ReportStore } from "../../stores/report.store";
import { Dropdown, Icon, Menu } from "antd";
import { TemplateStore } from "../../stores/templateStore";
import { Itemplate } from "../../models/template.model";
import { SpiralSpinner } from "react-spinners-kit";
import { mainTheme } from "../../assets/styles/_colors";
import { StatusButton, ProDropdown } from "../../components/ui/Buttons";
import { _measures } from "../../assets/styles/_measures";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  activeReport?: Report;
  reportStore?: ReportStore;
  templateStore?: TemplateStore;
}

const SideMenuItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  color: #000;
  :hover {
    background-color: #ccc;
    cursor: pointer;
  }
  .gi-menu-icon {
    font-size: 1.2em;
  }
  &.active {
    /* color: ${props => props.theme.primary}; */
    background-color: #000;
    color: #fff;
  }
   @media (max-width: ${_measures.mobile}px) {
    justify-content : center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  font-size: 0.8em;
  background-color: ${props => props.theme.disabled};
  @media (max-width: ${_measures.mobile}px) {
    width: 50px;
  }
`;

const SideMenuItemTitle = styled.span`
  padding-left: 20px;
  display: flex;
  flex: 1;
  max-width: 160px;
  font-size: 0.8em;
  letter-spacing: 3px;
  font-weight: bolder;
  @media (max-width: ${_measures.mobile}px) {
    display: none;
  }
`;

const ActionLink = styled.span`
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainButtonWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: center;
  align-items: center;
  background-color: ${props => props.theme.bg_tertiary};
`;

const TemplateChoiceButton = styled.span`
  @media (max-width: ${_measures.mobile}px) {
    display: none;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  isLogged: allStores.authStore.isLogged,
  activeReport: allStores.reportStore.activeReport,
  reportStore: allStores.reportStore,
  templateStore: allStores.templateStore,
}))
@observer
class EditorSidebar extends React.Component<Props> {
  private sectionClick = (sectionLabel: string) => {
    const editionMode = this.props.reportStore!.editionMode;
    switch (editionMode) {
      case "form":
        this.scroll(sectionLabel);
        break;
      case "direct":
        this.highlight(sectionLabel);
        break;
    }
  };

  private scroll = (sectionLabel: string) => {
    var element = document.getElementById(sectionLabel);
    element &&
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  };

  private highlight = (sectionLabel: string) => {
    console.log("hilight section in template");
  };
  private selectTemplate = (template: Itemplate) => {
    this.props.reportStore!.setTemplate(template);
  };

  public render() {
    const templatesLoaded = this.props.uiStore!.isTemplatesLoaded;
    const template = this.props.reportStore!.template!;

    const menu = (
      <Menu>
        {this.props.templateStore!.templates.map((template, index) => (
          <MenuItem
            key={"template-choice-" + index}
            onClick={() => this.selectTemplate(template)}
          >
            {template.label}
          </MenuItem>
        ))}
      </Menu>
    );

    return (
      <Container>
        <MainButtonWrapper>
          {templatesLoaded ? (
            <ProDropdown overlay={menu}>
              <ActionLink>
                <TemplateChoiceButton>
                  {template ? template.label : "Choix template"}
                </TemplateChoiceButton>
                <Icon type="down" style={{ marginLeft: "10px" }} />
              </ActionLink>
            </ProDropdown>
          ) : (
            <SpiralSpinner frontColor={mainTheme.secondary} loading={true} />
          )}
        </MainButtonWrapper>
        {this.props.reportStore!.activeReport &&
          this.props.reportStore!.template!.sections.map(
            (section, index: number) => {
              let status = "valid";
              let mandatory = false;
              const inputs = this.props.activeReport!.inputs;
              inputs
                .filter(input => input.inputRef.sectionId === section.id)
                .forEach(input => {
                  input.inputRef.mandatory && (mandatory = true);
                  input.status === "untouched" && (status = "untouched");
                });
              inputs
                .filter(input => input.inputRef.sectionId === section.id)
                .forEach(input => {
                  input.inputRef.mandatory && (mandatory = true);
                  input.status === "error" && (status = "error");
                });
              return (
                <SideMenuItem
                  key={"menu-item" + index}
                  onClick={() => this.sectionClick(section.label)}
                  // className={`${
                  //   this.props.activeSectionIndex === index ? "active" : ""
                  // }`}
                >
                  {/* <IconBox color={item.color}>
                <FontAwesomeIcon className="gi-menu-icon" icon={item.icon} />
              </IconBox> */}
                  <SideMenuItemTitle>
                    {section.label.toUpperCase()}
                  </SideMenuItemTitle>
                  <StatusButton status={status} mandatory={mandatory} />
                </SideMenuItem>
              );
            },
          )}
      </Container>
    );
  }
}

export default withRouter(EditorSidebar);
