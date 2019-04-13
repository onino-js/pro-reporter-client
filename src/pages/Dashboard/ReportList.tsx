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
import { EditorStore } from "../../stores/editor.store";
import { Row, Col } from "antd";
import { formatDate } from "../../services/app.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const Wrapper = styled(Col).attrs({
  xl: 18,
  xs: 24,
})`
  display: flex;
  flex-direction: column;
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
class ReportList extends React.Component<Props> {
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
    const reports = this.props.reportStore!.reports;
    const length = reports.length;
    return (
      <Flex dir="c">
        <Text>Vous avez {length} Rapports en cours</Text>
        <Wrapper>
          {reports.map((report: EditorStore, index: number) => {
            return (
              <Row key={"row" + index}>
                <Col xl={2} xs={2}>
                  {index + 1}
                </Col>
                <Col xl={3} xs={3}>
                  {formatDate(report.creationDate)}
                </Col>
                <Col xl={3} xs={3}>
                  {formatDate(report.lastModifiedDate)}
                </Col>
                <Col xl={3} xs={3}>
                  <FontAwesomeIcon icon="edit" />
                </Col>
              </Row>
            );
          })}
        </Wrapper>
      </Flex>
    );
  }
}

export default withRouter(ReportList);
