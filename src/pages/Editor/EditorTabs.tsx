import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { Report } from "../../stores/report";
import styled from "../../styled-components";
import { ReportStore } from "../../stores/report.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  Report?: Report;
  reportStore?: ReportStore;
  activeReport?: Report;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 45px;
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
  reportStore: allStores.reportStore,
  activeReport: allStores.reportStore.activeReport,
}))
@observer
class EditorTabs extends React.Component<Props> {
  private create = () => {
    this.props.reportStore!.create();
    this.refresh();
  };
  private refresh = () => {
    window.setTimeout(() => {
      this.props.reportStore!.fieldHighlighted &&
        this.props.reportStore!.renderContainers();
    }, 100);
  };
  private change = (id: string) => {
    this.props.reportStore!.setActiveReport(id);
    this.refresh();
  };

  public render() {
    return (
      <Container>
        <PlusTab active={true} onClick={this.create}>
          <FontAwesomeIcon icon="plus" />
        </PlusTab>
        {this.props.reportStore!.reports.map(
          (report: Report, index: number) => (
            <Tab
              key={"report-" + index}
              active={this.props.activeReport!.id === report.id}
              onClick={() => {
                this.change(report.id);
              }}
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
