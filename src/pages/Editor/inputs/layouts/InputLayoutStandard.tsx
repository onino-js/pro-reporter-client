import * as React from "react";
import { Row, Col, Dropdown, Button, Menu, Popover } from "antd";
import { SmallBullet } from "../../../../components/ui/SmallBullet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../../../styled-components";
import {
  SearchButton,
  RefreshButton,
  StatusButton,
  SearchIconBox,
} from "./EditorButtons";
import { InputLabel } from "./EditorTexts";

interface Props {
  input: any;
  actions?: React.ReactChild[] | React.ReactChild;
  additionalInfos?: React.ReactChild;
}

const MyRow = styled(Row)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0px;
`;

// Change button to div to enable antd dropdown
const SearchBox = SearchIconBox.withComponent("div");

const flexCenter = {
  style: {
    display: "flex",
    justifyContent: "center",
  },
};

const col1 = {
  xl: 1,
  md: 1,
  sm: 1,
  xs: 1,
  ...flexCenter,
};
const col2 = {
  xl: 7,
  md: 7,
  sm: 7,
  xs: 23,
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
    return (
      <React.Fragment>
        <MyRow type="flex" align="middle">
          <Col {...col1}>
            <SmallBullet mandatory={input.mandatory} />
          </Col>
          <Col {...col2}>
            <InputLabel>{input.label}</InputLabel>
            {input.documentation && (
              <Popover
                content={input.documentation}
                title={input.label}
                trigger="hover"
              >
                <FontAwesomeIcon
                  icon="question-circle"
                  style={{ marginLeft: "10px" }}
                />
              </Popover>
            )}
          </Col>
          {/* <Col {...col3}>{this.props.actions}</Col> */}
          <Col {...col4}>
            {this.props.children}
            {input.options && input.options.list && (
              <Dropdown
                overlay={
                  <Menu>
                    {input.options.list.map((item: any, index: number) => (
                      <Menu.Item
                        onClick={() => input.setValue(item)}
                        key={"menu-item" + index}
                      >
                        {item}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                placement="bottomLeft"
              >
                <SearchBox>
                  <FontAwesomeIcon icon="search" />
                </SearchBox>
              </Dropdown>
            )}
          </Col>
          <Col {...col5}>
            <RefreshButton
              active={this.props.input.status !== "untouched"}
              onClick={this.props.input.reset}
            />
          </Col>
          <Col {...col6}>
            <StatusButton status={this.props.input.status} />
          </Col>
        </MyRow>
        {this.props.additionalInfos && <Row>{this.props.additionalInfos}</Row>}
      </React.Fragment>
    );
  }
}

export default InputLayoutStandard;
