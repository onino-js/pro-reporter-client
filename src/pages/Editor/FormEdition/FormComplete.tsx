import * as React from "react";
import { Row, Col } from "antd";
import { componentMapping } from "../../../services/input-mapping.service";
import { SubsectionLabel } from "./../inputs/layouts/EditorTexts";
import styled from "../../../styled-components";

interface Props {
  inputs: any;
  sections?: any[];
}

const SectionContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${props => props.theme.disabled};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SectionTitle = styled.div`
  font-size: 24px;
  height: 24px;
  padding: 0px;
  margin-bottom: 20px;
`;

const SubsectionTitle = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.bg_primary};
  font-size: 1.3em;
  margin-bottom: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;

class FormComplete extends React.Component<Props> {
  public render() {
    return (
      <Row type="flex" justify="center">
        <Col xl={14} md={24} sm={24} xs={24}>
          {this.props.sections &&
            this.props.sections.map((section, index) => (
              <SectionContainer key={"section-" + index}>
                <SectionTitle id={section.label}>
                  {section.label.toUpperCase()}
                </SectionTitle>
                {section.subsections &&
                  section.subsections.map((sub: any, index: number) => (
                    <React.Fragment key={"subsection-" + index}>
                      <SubsectionTitle>{sub.label}</SubsectionTitle>
                      <div>
                        {this.props.inputs
                          .filter(
                            (input: any) =>
                              input.subsectionId === sub.id &&
                              input.sectionId === section.id,
                          )
                          .map((input: any, index2: number) => {
                            const Input = componentMapping[input.type];
                            return (
                              <Input
                                key={"input-" + index2}
                                inputId={input.id}
                              />
                            );
                          })}
                      </div>
                    </React.Fragment>
                  ))}
                <div>
                  {this.props.inputs
                    .filter(
                      (input: any) =>
                        input.sectionId === section.id && !input.subsectionId,
                    )
                    .map((input: any, index2: number) => {
                      const Input = componentMapping[input.type];
                      return (
                        <Input key={"input-" + index2} inputId={input.id} />
                      );
                    })}
                </div>
              </SectionContainer>
            ))}
          {/* <React.Fragment key={"subsection-0"}>
            {this.props.inputs
              .filter((input: any) => input.subsectionId === false)
              .map((input: any, index2: number) => {
                const Input = componentMapping[input.type];
                return <Input key={"input-" + index2} inputId={input.id} />;
              })}
          </React.Fragment> */}
        </Col>
      </Row>
    );
  }
}

export default FormComplete;
