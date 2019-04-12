import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import InputLayoutStandard from "../layouts/InputLayoutStandard";
import { Row, Col, Dropdown, Button, Menu, Popover } from "antd";
import { SmallBullet } from "../../../../components/ui/SmallBullet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../../../styled-components";
import {
  SearchButton,
  RefreshButton,
  StatusButton,
  SearchIconBox,
} from "./../layouts/EditorButtons";
import { InputLabel } from "./../layouts/EditorTexts";
import { OkButton, CancelButton, SelectButton } from "../layouts/EditorButtons";

interface Props {
  inputId: string;
  input?: any;
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
  xs: 7,
};
const col3 = {
  xl: 3,
  md: 3,
  sm: 3,
  xs: 3,
  ...flexCenter,
};
const col4 = {
  xl: 11,
  md: 11,
  sm: 11,
  xs: 11,
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
  xs: 2,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

@inject((allStores: AllStores, { inputId }) => ({
  uiStore: allStores.uiStore,
  input: allStores.reportStore.activeReport!.inputs.filter(
    item => item.id === inputId,
  )[0],
}))
@observer
class SingleSelectInput extends React.Component<Props> {
  private setValue = (e: string) => {
    this.props.input!.setValue(e);
  };
  public render() {
    const input = this.props.input;
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
            {this.props.input!.options.values.map(
              (item: any, index: number) => (
                <SelectButton
                  key={"single-select-input" + index}
                  onClick={() => this.setValue(item)}
                  className={this.props.input.value === item ? "active" : ""}
                >
                  {item}
                </SelectButton>
              ),
            )}
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
      </React.Fragment>
    );
  }
}

export default SingleSelectInput;
