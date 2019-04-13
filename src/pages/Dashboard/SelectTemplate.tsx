import * as React from "react";
import { template } from "../../assets/static-data/templates/gaz-linking-1";
import styled from "../../styled-components";
import { NormalButton } from "../Editor/inputs/layouts/EditorButtons";
import { Flex } from "../../components/ui/Flex";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { template2 } from "../../assets/static-data/templates/chaudiere";

interface Props extends RouteComponentProps {
  uiStore?: any;
  reportStore?: ReportStore;
}

const Text = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

const Label = styled.div`
  width: 100%;
  text-align: center;
`;

const templates = [
  {
    id: "gaz-template",
    label: "Raccordement Gaz",
    template: template,
  },
  {
    id: "chaudiere-template",
    label: "Contrôle chaudière",
    template: template2,
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const TemplateItemBox: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TemplateItem: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  cursor: pointer;
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px dashed ${props => props.theme.disabled};
  &.active {
    border: 5px solid ${props => props.theme.secondary};
  }
`;

const EditButton: any = styled(NormalButton).attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  &.active {
    display: inline;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class SelectTemplate extends React.Component<Props> {
  public state = {
    selectedTemplateId: null,
  };

  componentDidMount() {
    // const res = checkTemplate(template);
    templates.forEach((temp: any) => {
      const el = document.getElementById(temp.id);
      el && (el.innerHTML = temp.template);
    });
  }

  private selectTemplate = (templateId: string) => {
    this.setState({ selectedTemplateId: templateId });
  };
  private editTemplate = () => {
    const template = templates.find(
      temp => temp.id === this.state.selectedTemplateId,
    )!.template;
    this.props.reportStore!.setTemplate(template);
    this.props.reportStore!.initialize();
    this.props.history.push("/editor/direct");
  };

  public render() {
    return (
      <Flex dir="c">
        <Text>Vous n'avez pas de rapport en cours d'édition.</Text>
        <Text>Choisissez un template à éditer : </Text>
        <Wrapper>
          {templates.map((temp: any, index: number) => (
            <TemplateItemBox key={"template" + index}>
              <TemplateItem
                id={temp.id}
                onClick={() => this.selectTemplate(temp.id)}
                active={this.state.selectedTemplateId === temp.id ? 1 : 0}
              />
              <Label>{temp.label}</Label>
              <EditButton
                onClick={this.editTemplate}
                active={this.state.selectedTemplateId === temp.id ? 1 : 0}
              >
                EDITER
              </EditButton>
            </TemplateItemBox>
          ))}
        </Wrapper>
      </Flex>
    );
  }
}

export default withRouter(SelectTemplate);
