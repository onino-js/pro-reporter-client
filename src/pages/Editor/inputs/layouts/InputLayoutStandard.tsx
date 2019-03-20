import * as React from "react";
import { Layout, Row, Col, Dropdown, Button, Menu, Popover } from "antd";
import { SmallBullet } from "../../../../components/ui/SmallBullet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../../../styled-components";

interface Props {
  // uiStore?: UiStore;
  input: any;
  actions?: React.ReactChild[] | React.ReactChild;
}

const MyRow = styled(Row)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputLabel = styled.div`
  letter-spacing: 5px;
  font-size: 1.1em;
  color: ${({ theme }) => theme.font_primary};
`;

const SuccessIcon = styled(FontAwesomeIcon).attrs({
  icon: "check",
})`
  font-size: 1.5em;
  color: ${props => props.theme.font_secondary};
`;

const SearchIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.font_primary};
  color: ${props => props.theme.font_primary};
  height: 50px;
  width: 50px;
  cursor: pointer;
`;

const StatuIconBox: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: any) =>
    props.status === "valid" ? props.theme.success : props.theme.disabled};
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const RefreshIconBox: any = styled.div`
  /* border-color: ${({ theme }) => theme.font_primary};
  border-width: 1px; */
  display : flex;
  align-items : center;
  justify-content : center;
  /* border-top-left-radius : 25px;
  border-bottom-left-radius : 25px; */
  background-color : ${(props: any) =>
    props.active ? props.theme.font_primary : props.theme.disabled};
  /* border-radius : 25px; */
  height: 40px;
  width: 40px;
  cursor : pointer;
`;

const SearchIcon = styled(FontAwesomeIcon).attrs({
  icon: "search",
})`
  font-size: 1.5em;
`;

const RefreshIcon: any = styled(FontAwesomeIcon).attrs({
  icon: "sync-alt",
})`
  font-size: 1.5em;
  cursor: pointer;
  color: ${(props: any) => props.theme.font_secondary};
`;

const col1 = {
  xl: 1,
  style: {
    display: "flex",
    justifyContent: "center",
  },
};
const col2 = {
  xl: 5,
  style: {
    display: "flex",
    alignItems: "center",
  },
};
const col3 = {
  xl: 3,
  style: {
    display: "flex",
    justifyContent: "center",
  },
};
const col4 = {
  xl: 10,
  style: {
    display: "flex",
  },
};
const col5 = {
  xl: 3,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
const col6 = {
  xl: 2,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

class InputLayoutStandard extends React.Component<Props> {
  public render() {
    const { input } = this.props;
    return (
      <MyRow type="flex" align="middle">
        <Col {...col1}>
          <SmallBullet mandatory={input.mandatory} />
        </Col>
        <Col {...col2}>
          <InputLabel>{input.title}</InputLabel>
          {input.documentation && (
            <Popover
              content={input.documentation}
              title={input.title}
              trigger="hover"
            >
              <FontAwesomeIcon
                icon="question-circle"
                style={{ marginLeft: "10px" }}
              />
            </Popover>
          )}
        </Col>
        <Col {...col3}>{this.props.actions}</Col>
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
              <SearchIconBox>
                <SearchIcon />
              </SearchIconBox>
            </Dropdown>
          )}
        </Col>
        <Col {...col5}>
          <RefreshIconBox
            active={this.props.input.status !== "untouched"}
            onClick={this.props.input.reset}
          >
            <RefreshIcon />
          </RefreshIconBox>
        </Col>
        <Col {...col6}>
          <StatuIconBox status={this.props.input.status}>
            {this.props.input.status === "untouched" && (
              <FontAwesomeIcon
                icon="exclamation-triangle"
                style={{ fontSize: "1.5em" }}
                color="#FFF"
              />
            )}
            {this.props.input.status === "valid" && <SuccessIcon />}
          </StatuIconBox>
        </Col>
      </MyRow>
    );
  }
}

export default InputLayoutStandard;
