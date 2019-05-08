import * as React from "react";
import styled from "../../styled-components";
import { Flex } from "../../components/ui/Flex";
import { withRouter, RouteComponentProps } from "react-router";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Col, Row } from "antd";
import { _measures } from "../../assets/styles/_measures";
import { UiStore } from "../../stores/ui.store";
import { IreportJson } from "../../stores/report";
import ReportListItem from "../../components/items/ReportListItem";
import { Istatus } from "../../models/app.models";
import { ArchiveStore } from "../../stores/archive.store";
import ArchivesItemMenu from "./ArchivesItemMenu";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  archiveStore?: ArchiveStore;
  templateFilter: string;
  statusFilter: Istatus | null;
}

const Wrapper = styled(Col).attrs({
  xl: 18,
  xs: 24,
})`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 800px;
  margin-top: 20px;
  overflow-y: auto;
  @media (max-width: ${_measures.tablet}px) {
    width: 100%;
    margin-top: 5px;
  }
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  archiveStore: allStores.archiveStore,
}))
@observer
class ArchivesList extends React.Component<Props> {
  componentDidMount() {
    // this.props.archiveStore!.getReportList();
  }
  public render() {
    const filteredArchives = this.props
      .archiveStore!.archiveList.filter(r => {
        if (this.props.templateFilter === "") {
          return true;
        } else {
          return r.templateId === this.props.templateFilter;
        }
      })
      .filter(r => {
        if (this.props.statusFilter === null) {
          return true;
        } else {
          return r.status === this.props.statusFilter;
        }
      });

    return (
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
        {filteredArchives.map((report: IreportJson, index: number) => (
          <ReportListItem
            key={"report-list-item" + index}
            report={report}
            actionMenu={<ArchivesItemMenu reportId={report.id} />}
          />
        ))}
        {filteredArchives.length === 0 && (
          <Flex flex={1} alignH="center" alignV="center">
            Aucune archive
          </Flex>
        )}
      </Wrapper>
    );
  }
}

export default withRouter(ArchivesList);
