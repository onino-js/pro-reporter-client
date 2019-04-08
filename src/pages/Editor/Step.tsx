import * as React from "react";
import { Row, Col } from "antd";
import { componentMapping } from "../../services/input-mapping.service";
import { Title1 } from "../../components/ui/Texts";

interface Props {
  inputs: any;
  subsections?: any[];
}

class Step extends React.Component<Props> {
  public render() {
    return (
      <Row type="flex" justify="center">
        <Col xl={18} md={20} sm={24} xs={24}>
          {this.props.subsections &&
            this.props.subsections.map((sub, index) => (
              <React.Fragment key={"subsection-" + index}>
                <Title1>{sub.label}</Title1>
                {this.props.inputs
                  .filter((input: any) => input.subsectionId === sub.id)
                  .map((input: any, index2: number) => {
                    const Input = componentMapping[input.type];
                    return <Input key={"input-" + index2} inputId={input.id} />;
                  })}
              </React.Fragment>
            ))}
          <React.Fragment key={"subsection-0"}>
            {this.props.inputs
              .filter((input: any) => input.subsectionId === false)
              .map((input: any, index2: number) => {
                const Input = componentMapping[input.type];
                return <Input key={"input-" + index2} inputId={input.id} />;
              })}
          </React.Fragment>
        </Col>
      </Row>
    );
  }
}

export default Step;
