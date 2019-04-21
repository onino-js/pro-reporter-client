import * as React from "react";
import styled from "../../styled-components";
import { Flex } from "../../components/ui/Flex";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Report } from "../../stores/report";
import { Row, Col } from "antd";
import { formatDate } from "../../services/app.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ireport } from "../../models/template.model";
import LoadingZone from "../../components/ui/LoadingZone";

interface Props extends RouteComponentProps {
  uiStore?: any;
  reportStore?: ReportStore;
}

const Text = styled.div`
  font-size: 16px;
  margin-bottom: 30px;
`;

const Wrapper = styled(Col).attrs({
  xl: 18,
  xs: 24,
})`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class OnGingList extends React.Component<Props> {
  componentDidMount() {
    this.props.reportStore!.getReportList();
  }
  public render() {
    const reports = this.props.reportStore!.reportList;
    const isReportsLoaded = this.props.uiStore!.isReportsLoaded;
    const length = reports.length;
    return isReportsLoaded ? (
      <Flex dir="c">
        <Text>Vous avez {length} Rapports en cours</Text>
        <Wrapper>
          {reports.map((report: Ireport, index: number) => {
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
    ) : (
      <LoadingZone message="Chargement des documents en cours" />
    );
  }
}

export default withRouter(OnGingList);
