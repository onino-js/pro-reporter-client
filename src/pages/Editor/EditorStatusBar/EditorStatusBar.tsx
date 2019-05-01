import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import styled from "../../../styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { UiStore } from "../../../stores/ui.store";
import { Flex } from "../../../components/ui/Flex";
import { _measures } from "../../../assets/styles/_measures";
import { Report } from "../../../stores/report";
import StatusNumber from "../../../components/ui/StatusNumber";
import { StatusButton } from "../../../components/ui/Buttons";

interface Props extends RouteComponentProps {
  uiStore?: UiStore;
  report?: Report;
}

const Container = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${props => props.theme.disabled};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
`;

const LeftWrapperPc = styled(Flex)`
  /* @media (max-width: ${_measures.mobile}px) {
    display: none;
  } */
`;

// const LeftWrapperMobile = styled(Flex)`
//   padding-left: 10px;
//   color: ${props => props.theme.bg_primary};
//   @media (min-width: ${_measures.mobile}px) {
//     display: none;
//   }
// `;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  report: allStores.reportStore.activeReport,
}))
@observer
class EditorStatusBar extends React.Component<Props> {
  public render() {
    const report = this.props.report!;
    return (
      <Container>
        <Flex p="0px 10px">
          <StatusNumber count={report.untouchedNb} status="untouched" />
          <StatusNumber count={report.warningsNb} status="warning" />
          <StatusNumber count={report.errorsNb} status="error" />
          <StatusNumber count={report.validNb} status="valid" />
        </Flex>
        {/* <LeftWrapperMobile>bley</LeftWrapperMobile> */}
        <Flex alignH="flex-end" p="0px 5px 0px 0px">
          <StatusButton status={report.status} />
        </Flex>
      </Container>
    );
  }
}

export default withRouter(EditorStatusBar);
