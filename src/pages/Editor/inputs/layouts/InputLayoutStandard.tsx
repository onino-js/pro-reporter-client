import * as React from "react";
import { Row, Col } from "antd";
import styled from "../../../../styled-components";
import { RefreshButton, StatusButton } from "../../../../components/ui/Buttons";
import { IinputStore } from "../../../../models/template.model";
import InputDescriptionButton from "./InputDescriptionButton";

interface Props {
  input: IinputStore;
  actions?: React.ReactChild[] | React.ReactChild;
  additionalInfos?: React.ReactChild;
}

const MyRow = styled(Row)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0px;
`;

const InputLabel = styled.div`
  letter-spacing: 3px;
  font-size: 0.8em;
  color: ${({ theme }) => theme.font_primary};
  display: flex;
  align-items: center;
`;

// Change button to div to enable antd dropdown

const col2 = {
  xl: 8,
  md: 8,
  sm: 8,
  xs: 24,
  style: {
    height: "30px",
    lineHeight: "30px",
  },
};
const col4 = {
  xl: 11,
  md: 11,
  sm: 11,
  xs: 18,
  style: {
    display: "flex",
    flexWrap: "wrap" as "wrap",
  },
};
const col5 = {
  xl: 3,
  md: 3,
  sm: 3,
  xs: 3,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
const col6 = {
  xl: 2,
  md: 2,
  sm: 2,
  xs: 3,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

class InputLayoutStandard extends React.Component<Props> {
  public render() {
    const { input } = this.props;
    //@ts-ignore
    return (
      <React.Fragment>
        <MyRow type="flex" align="middle">
          <Col {...col2}>
            <InputLabel>
              {input.inputRef.description && <InputDescriptionButton input={input} />}
              {input.inputRef.label}
            </InputLabel>
            {/* {input.inputRef.description && (
              <Popover
                content={input.inputRef.description}
                title={input.inputRef.label}
                trigger="hover"
              >
                <FontAwesomeIcon
                  icon="question-circle"
                  style={{ marginLeft: "10px" }}
                />
              </Popover>
            )} */}
          </Col>
          {/* <Col {...col3}>{this.props.actions}</Col> */}
          <Col {...col4}>{this.props.children}</Col>
          <Col {...col5}>
            {this.props.input.status !== "untouched" && (
              <RefreshButton active={true} onClick={this.props.input.reset} />
            )}
          </Col>
          <Col {...col6}>
            <StatusButton
              status={this.props.input.status}
              mandatory={this.props.input.inputRef.mandatory}
            />
          </Col>
        </MyRow>
        {this.props.additionalInfos && <Row>{this.props.additionalInfos}</Row>}
      </React.Fragment>
    );
  }
}

export default InputLayoutStandard;
