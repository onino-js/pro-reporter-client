import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import { Itemplate } from "../../models/template.model";

interface Props {
  show: boolean;
  close: () => void;
  template?: Itemplate;
  templateId: string | null;
}

@inject((allStores: AllStores, { templateId }) => ({
  uiStore: allStores.uiStore,
  template: !templateId
    ? null
    : allStores.templateStore.templates.find(t => t.id === templateId),
}))
@observer
class TemplateInfoModal extends React.Component<Props> {
  public render() {
    const template = this.props.template!;
    return (
      <ProModal
        show={this.props.show}
        close={this.props.close}
        headerTitle={"Information template"}
        width={["50%", "100%"]}
        height={["auto", "auto"]}
      >
        {template && (
          <ProContainer>
            <p>Information du template</p>
            <p>{template.label}</p>
            <p>{template.licence}</p>
          </ProContainer>
        )}
      </ProModal>
    );
  }
}

export default TemplateInfoModal;
