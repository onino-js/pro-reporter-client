import * as React from "react";
import styled from "../../styled-components";
import { Flex } from "../../components/ui/Flex";
import { withRouter, RouteComponentProps } from "react-router";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Col, Row } from "antd";
import { _measures } from "../../assets/styles/_measures";
import { UiStore } from "../../stores/ui.store";
import { IreportJson } from "../../stores/report";
import ReportListItem from "../../components/items/ReportListItem";
import OnGoingItemMenu from "./OnGoingItemMenu";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  reportStore?: ReportStore;
  templateFilter: string;
  statusFilter: string;
}

const Wrapper = styled(Col).attrs({
  xl: 18,
  xs: 24,
})`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 20px;
  @media (max-width: ${_measures.tablet}px) {
    width: 100%;
    margin-top: 5px;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class OnGoingList extends React.Component<Props> {
  componentDidMount() {
    // this.props.reportStore!.getReportList();
  }
  public render() {
    const reports = this.props.reportStore!.reportList;
    return (
      <Flex dir="c" scrollY="auto" flex={1}>
        <Wrapper>
          {/* <Row type="flex" align="middle">
            <Col xl={3} xs={3}>
              Date création
            </Col>
            <Col xl={3} xs={3}>
              Dernière modif
            </Col>
            <Col xl={13} xs={13}>
              Nom template
            </Col>
            <Col xl={4} xs={4}>
              status
            </Col>
          </Row> */}
          {reports
            .filter(r => {
              if (this.props.templateFilter === "") {
                return true;
              } else {
                return r.templateId === this.props.templateFilter;
              }
            })
            .filter(r => {
              if (this.props.statusFilter === "Tous les status") {
                return true;
              } else {
                return r.status === this.props.statusFilter;
              }
            })
            .map((report: IreportJson, index: number) => (
              <ReportListItem
                key={"report-list-item" + index}
                report={report}
                actionMenu={<OnGoingItemMenu reportId={report.id} />}
              />
            ))}
        </Wrapper>
      </Flex>
    );
  }
}

export default withRouter(OnGoingList);
