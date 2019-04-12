import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { EditorStore } from "../../stores/editor.store";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  editorStore?: EditorStore;
  reportStore?: ReportStore;
  activeReport?: EditorStore;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  padding-bottom : 10px;
  background-color: ${props => props.theme.disabled};
  border-top : 5px solid ${props => props.theme.secondary}
  display: flex;
  flex-wrap : wrap;
`;

const Tab: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  flex: 1;
  max-width: 70px;
  min-width: 40px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.font_secondary};
  font-weight: bold;
  background-color: ${props => props.theme.disabled};
  &.active {
    background-color: ${props => props.theme.secondary};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const PlusTab = Tab.extend`
  width: 70px;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  editorStore: allStores.editorStore,
  reportStore: allStores.reportStore,
  activeReport: allStores.reportStore.activeReport,
}))
@observer
class EditorTabs extends React.Component<Props> {
  public render() {
    return (
      <Container>
        <PlusTab active={true} onClick={this.props.reportStore!.create}>
          <FontAwesomeIcon icon="plus" />
        </PlusTab>
        {this.props.reportStore!.reports.map(
          (report: EditorStore, index: number) => (
            <Tab
              key={"report-" + index}
              active={this.props.activeReport!.id === report.id}
              onClick={() => this.props.reportStore!.setActiveReport(report.id)}
            >
              {index}
            </Tab>
          ),
        )}
      </Container>
    );
  }
}

export default EditorTabs;
