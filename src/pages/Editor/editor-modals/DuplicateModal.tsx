import * as React from "react";
import styled from "../../../styled-components";
import ProModal from "../../../components/modals/ProModal";
import { Input, Switch, Row, Col, Divider } from "antd";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { ReportStore } from "../../../stores/report.store";
import { UiStore } from "../../../stores/ui.store";
import { Flex } from "../../../components/ui/Flex";
import { ProContainer } from "../../../components/layouts/ProContainer";
import { ActionButton } from "../../../components/ui/Buttons";

interface Props {
  reportStore?: ReportStore;
  uiStore?: UiStore;
}
interface State {
  nb: number;
  sectionsToClone: string[];
}

const Wrapper = styled.div`
  width: 100%;
  margin: 0px auto;
`;

const SectionRow = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  reportStore: allStores.reportStore,
}))
@observer
class DuplicateModal extends React.Component<Props, State> {
  public state = {
    nb: 1,
    sectionsToClone: [],
  };
  componentWillUnmount() {
    this.setState({ sectionsToClone: [] });
  }
  private setNb = (e: any) => {
    let value = Number(e.currentTarget.value);
    value > 0 && this.setState({ nb: value });
    //this.setState({ nb: value });
  };
  private plusOne = () => {
    this.setState({ nb: this.state.nb + 1 });
  };
  private minusOne = () => {
    this.setState({ nb: this.state.nb - 1 });
  };

  private close = () => this.props.uiStore!.hideModal("duplicate");

  private onOk = () => {
    this.props.uiStore!.showModal("loading");
    window.setTimeout(() => {
      this.props.reportStore!.customDuplicate({
        nb: this.state.nb,
        sectionsIds: this.state.sectionsToClone,
      });
      this.props.uiStore!.hideModal("duplicate");
      this.props.uiStore!.hideModal("loading");
    }, 100);
  };
  private selectSection = (id: string) => {
    let sectionsToClone: string[] = this.state.sectionsToClone.slice();
    //@ts-ignore
    if (this.state.sectionsToClone.includes(id)) {
      sectionsToClone = sectionsToClone.filter(item => item !== id);
    } else {
      sectionsToClone.push(id);
    }
    this.setState({ sectionsToClone });
  };

  private selectAll = () => {
    let sectionsToClone: string[];
    //@ts-ignore
    if (
      this.state.sectionsToClone.length ===
      this.props.reportStore!.template!.sections.length
    ) {
      sectionsToClone = [];
    } else {
      sectionsToClone = this.props.reportStore!.template!.sections.map(
        section => section.id,
      );
    }
    this.setState({ sectionsToClone });
  };

  public render() {
    return (
      <ProModal
        show={this.props.uiStore!.showDuplicateModal}
        close={this.close}
        onOk={this.onOk}
        width={["auto", "100%"]}
        height={["auto", "100%"]}
        headerTitle="Dupliquer le rapport"
        // styles={{minWidth : "360px", maxHeight : "100%"}}
      >
        <ProContainer>
          <Wrapper>
            <SectionRow>
              <span>Nombre:</span>
              <Flex alignH="center">
                <Input
                  type="number"
                  min={1}
                  style={{ width: "70px" }}
                  onChange={this.setNb}
                  value={this.state.nb}
                />
                <ActionButton
                  icon="plus"
                  m="0px 0px 0px 5px"
                  onClick={this.plusOne}
                />
                <ActionButton
                  icon="minus"
                  m="0px 0px 0px 5px"
                  onClick={this.minusOne}
                />
              </Flex>
            </SectionRow>
            <SectionRow onClick={this.selectAll}>
              <span>Tous les champs</span>
              <Switch
                checked={
                  this.state.sectionsToClone.length ===
                  this.props.reportStore!.template!.sections.length
                }
                onChange={this.selectAll}
              />
            </SectionRow>
            <Divider />
            {this.props.reportStore!.template!.sections.map(
              (section: any, index: number) => {
                return (
                  <SectionRow
                    key={"section-choice-" + index}
                    onClick={() => this.selectSection(section.id)}
                  >
                    <span>{section.label}</span>
                    <Switch
                      checked={this.state.sectionsToClone.includes(
                        //@ts-ignore
                        section.id as string,
                      )}
                      onChange={() => this.selectSection(section.id)}
                    />
                  </SectionRow>
                );
              },
            )}
          </Wrapper>
        </ProContainer>
      </ProModal>
    );
  }
}

export default DuplicateModal;
