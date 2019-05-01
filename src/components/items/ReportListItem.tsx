import * as React from "react";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { formatDate } from "../../services/app.service";
import { UiStore } from "../../stores/ui.store";
import { _measures } from "../../assets/styles/_measures";
import { IreportJson, Report } from "../../stores/report";
import StatusNumber from "./../ui/StatusNumber";

interface Props {
  uiStore?: UiStore;
  reportStore?: ReportStore;
  report: IreportJson | Report;
  deleteReport?: (id: string) => void;
  actionMenu?: React.ReactChild;
  onClick?: (e: React.SyntheticEvent) => void;
}

interface IContainerProps {
  clickable: boolean;
}

const Container = styled.div<IContainerProps>`
  display : flex;
  flex-shrink : 0;
  height: 50px;
  background-color: ${props => props.theme.disabled};
  margin-top: 5px;
  width: 100%;
  cursor : ${(props: IContainerProps) =>
    props.clickable ? "pointer" : "initial"};
  /* :hover {
    border: 1px solid ${props => props.theme.secondary};
  } */
`;

const DateCol = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  font-size: 10px;
  margin-left: 20px;
  @media (max-width: ${_measures.mobile}px) {
    width: 70px;
    margin-left: 10px;
  }
`;
const TemplateNameCol = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  line-height: 100%;
`;
const StatusCol = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
`;
const ActionCol = styled.div`
  display: flex;
  width: 50px;
  align-items: center;
  justify-content: center;
`;

// @inject((allStores: AllStores, { reportId }) => ({
//   report: allStores.reportStore.reportList.find(
//     report => reportId === report.id,
//   ),
// }))
@observer
class ReportListItem extends React.Component<Props> {
  public render() {
    const report = this.props.report!;
    return (
      <Container onClick={this.props.onClick} clickable={!!this.props.onClick}>
        <DateCol>{formatDate(report.lastModifiedDate)}</DateCol>
        <TemplateNameCol style={{ overflow: "hidden" }}>
          {report.templateName}
        </TemplateNameCol>
        <StatusCol>
          <StatusNumber count={report.untouchedNb} status="untouched" />
          <StatusNumber count={report.warningsNb} status="warning" />
          <StatusNumber count={report.errorsNb} status="error" />
          <StatusNumber count={report.validNb} status="valid" />
        </StatusCol>
        {/* <MainStatusCol>
          <StatusButton status={report.status} size="big" />
        </MainStatusCol> */}
        <ActionCol>{this.props.actionMenu && this.props.actionMenu}</ActionCol>
      </Container>
    );
  }
}

export default ReportListItem;
