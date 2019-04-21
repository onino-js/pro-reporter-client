import * as React from "react";
import styled from "../../../styled-components";
import ProModal from "../../../components/modals/ProModal";
import { Input, Switch, Row, Col } from "antd";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../models/all-stores.model";
import { ReportStore } from "../../../stores/report.store";
import { UiStore } from "../../../stores/ui.store";
import { Flex } from "../../../components/ui/Flex";
import { _measures } from "../../../assets/styles/_measures";
import { ProContainer } from "../../../components/layouts/ProContainer";
import { ActionButton } from "../../../components/ui/Buttons";

interface Props {
  reportStore?: ReportStore;
  uiStore?: UiStore;
}
interface State {
  nb?: number;
  sectionsToClone?: string[];
}

const Wrapper = styled.div`
  width: 50%;
  margin: 0px auto;
  @media (max-width: ${_measures.tablet}px) {
    width: 70%;
  }
  @media (max-width: ${_measures.mobile}px) {
    width: 100%;
  }
`;

const SectionRow = styled(Row)`
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Text1 = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 40px;
  margin-bottom: 10px;
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
        sections: this.state.sectionsToClone,
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
        width={["80%", "100%"]}
        height={["100%", "100%"]}
        headerTitle="Dupliquer le rapport"
      >
        <ProContainer>
          <Wrapper>
            <SectionRow>
              <Text1>Nombre de rapports à dupliquer</Text1>
              <Flex m="20px 0px" alignH="center">
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
                  h="30px"
                  w="30px"
                />
                <ActionButton
                  icon="minus"
                  m="0px 0px 0px 5px"
                  onClick={this.minusOne}
                  h="30px"
                  w="30px"
                />
              </Flex>
            </SectionRow>
            <Text1>Sections à dupliquer :</Text1>
            <SectionRow onClick={this.selectAll}>
              <Col xl={18} xs={18}>
                <span>Tous les champs</span>
              </Col>
              <Col xl={6} xs={6}>
                <Switch
                  checked={
                    this.state.sectionsToClone.length ===
                    this.props.reportStore!.template!.sections.length
                  }
                  onChange={this.selectAll}
                />
              </Col>
            </SectionRow>

            {this.props.reportStore!.template!.sections.map(
              (section: any, index: number) => {
                return (
                  <SectionRow
                    key={"section-choice-" + index}
                    onClick={() => this.selectSection(section.id)}
                  >
                    <Col xl={18} xs={18}>
                      <span>{section.label}</span>
                    </Col>
                    <Col xl={6} xs={6}>
                      <Switch
                        checked={this.state.sectionsToClone.includes(
                          //@ts-ignore
                          section.id as string,
                        )}
                        onChange={() => this.selectSection(section.id)}
                      />
                    </Col>
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
