import * as React from "react";
import styled from "../../styled-components";
import { Flex } from "../../components/ui/Flex";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Itemplate } from "../../models/template.model";
import TemplateItem from "./TemplateItem";

interface Props extends RouteComponentProps {
  uiStore?: any;
  reportStore?: ReportStore;
  templates?: Itemplate[];
}

const Text = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;


const Wrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;


@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
  templates: allStores.templateStore.templates,
}))
@observer
class TemplateList extends React.Component<Props> {
  public state = {
    selectedTemplateId: null,
  };

  componentDidMount() {
    this.renderTemplateIcon();
  }
  componentDidUpdate() {
    this.renderTemplateIcon();
  }

  private renderTemplateIcon = () => {
    this.props.templates!.forEach((template: Itemplate) => {
      const el = document.getElementById("template-container" + template.id);
      el && (el.innerHTML = template.svg);
      document.getElementById(template.id)!.setAttribute("width", "100%");
    });
  };
  private selectTemplate = (templateId: string) => {
    this.setState({ selectedTemplateId: templateId });
  };
  private editTemplate = (template: Itemplate) => {
    this.props.reportStore!.setTemplate(template!);
    this.props.history.push("/editor/direct");
  };
  private viewTemplate = (template: Itemplate) => {
    this.props.reportStore!.setTemplate(template!);
    this.props.history.push("/editor/direct");
  };

  public render() {
    return this.props.templates!.length !== 0 ? (
      <Flex dir="c" m="20px 0px 0px 0px">
        <Text>Choisissez un template à éditer : </Text>
        <Wrapper>
          {this.props.templates!.map((template: Itemplate, index: number) => (
            <TemplateItem 
              template={template}
              selectedTemplateId={this.state.selectedTemplateId}
              index={index} 
              selectTemplate={this.selectTemplate}
              editTemplate={this.editTemplate}
              viewTemplate = {this.viewTemplate}
        />
      ))}
        </Wrapper>
      </Flex>
    ) : (
      <div> </div>
    );
  }
}

export default withRouter(TemplateList);
