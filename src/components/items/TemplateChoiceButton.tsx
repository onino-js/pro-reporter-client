import * as React from "react";
import { ProDropdown, ActionButton } from "../../components/ui/Buttons";
import { Menu } from "antd";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { TemplateStore } from "../../stores/templateStore";
import { TemplateMenuItemSmall } from "./TemplateMenuItemSmall";

interface Props {
  templateStore?: TemplateStore;
  filterTemplate: (id: string) => void;
  selectedTemplateId: string | null;
}

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  templateStore: allStores.templateStore,
}))
@observer
class TemplateChoiceButton extends React.Component<Props> {
  public render() {
    const templates = this.props.templateStore!.templates;
    let selectedTemplate = this.props.templateStore!.templates.find(
      t => t.id === this.props.selectedTemplateId,
    );
    return (
      <ProDropdown
        trigger={["click"]}
        overlay={
          <Menu style={{ maxWidth: "300px" }}>
            <Menu.Item
              key={"template-choice-0"}
              onClick={() => this.props.filterTemplate("")}
            >
              Tous les templates
            </Menu.Item>
            {templates &&
              templates.map((t, index) => (
                <TemplateMenuItemSmall
                  key={"template-choice-" + (index + 1)}
                  title={t.label}
                  img={t.imgPath}
                  onClick={() => this.props.filterTemplate(t.id)}
                />
              ))}
          </Menu>
        }
      >
        <ActionButton
          title={
            selectedTemplate
              ? templates.find(i => i.id === this.props.selectedTemplateId)!
                  .label
              : "Tous les templates"
          }
          icon="chevron-down"
          m="0px 10px 0px 0px"
          // size="big"
        />
      </ProDropdown>
    );
  }
}

export default TemplateChoiceButton;
