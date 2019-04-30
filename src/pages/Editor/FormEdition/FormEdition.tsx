import * as React from "react";
import { Row, Col } from "antd";
import { componentMapping } from "../../../services/input-mapping.service";
import styled from "../../../styled-components";
import { Flex } from "../../../components/ui/Flex";
import { observer, inject } from "mobx-react";
import { _measures } from "../../../assets/styles/_measures";
import { ProContainer } from "../../../components/layouts/ProContainer";
import { AllStores } from "../../../models/all-stores.model";
import { StatusButton } from "../../../components/ui/Buttons";
import { IinputStore, IinputStatus } from "../../../models/template.model";

interface Props {
  inputs?: IinputStore[];
  sections?: any[];
}

const SectionContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: ${props => props.theme.disabled};
  margin-bottom: 24px;
  @media (max-width: ${_measures.tablet}px) {
    margin-bottom: 12px;
  }
`;

const SectionTitle = styled.div`
  font-size: 24px;
  height: 24px;
  padding: 0px;
  margin-bottom: 20px;
`;

@inject((allStores: AllStores) => ({
  inputs: allStores.reportStore.activeReport!.inputs,
  sections: allStores.reportStore.template!.sections,
}))
@observer
class FormEdition extends React.Component<Props> {
  public render() {
    return (
      <ProContainer scrollY="auto">
        <Col xl={20} md={24} sm={24} xs={24}>
          {this.props.sections &&
            this.props.sections.map((section, index) => {
              let status: IinputStatus = "valid";
              let mandatory = false;
              this.props
                .inputs!.filter(
                  input => input.inputRef.sectionId === section.id,
                )
                .forEach(input => {
                  input.inputRef.mandatory && (mandatory = true);
                  input.status === "untouched" && (status = "untouched");
                });
              this.props
                .inputs!.filter(
                  input => input.inputRef.sectionId === section.id,
                )
                .forEach(input => {
                  input.inputRef.mandatory && (mandatory = true);
                  input.status === "error" && (status = "error");
                });
              return (
                <SectionContainer key={"section-" + index}>
                  <Flex alignH="space-between">
                    <SectionTitle id={section.label}>
                      {section.label.toUpperCase()}
                    </SectionTitle>
                    <StatusButton status={status} mandatory={mandatory} />
                  </Flex>

                  <div>
                    {this.props
                      .inputs!.filter(
                        input => input.inputRef.sectionId === section.id,
                      )
                      .map((input, index2: number) => {
                        const Input = componentMapping[input.inputRef.type];
                        return (
                          <Input key={"input-" + index2} inputId={input.id} />
                        );
                      })}
                  </div>
                </SectionContainer>
              );
            })}
        </Col>
      </ProContainer>
    );
  }
}

export default FormEdition;
