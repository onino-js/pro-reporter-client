import * as React from "react";
import { Layout, Row, Col, Dropdown, Button, Menu, Popover } from "antd";
import { SmallBullet } from "../../../../components/ui/SmallBullet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../../../styled-components";
import { Flex } from "../../../../components/ui/Flex";

interface Props {
  // uiStore?: UiStore;
  input: any;
  actions?: React.ReactChild[] | React.ReactChild;
  additionalInfos?: React.ReactChild;
}

const Title = styled.div`
  color: ${props => props.theme.primary};
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
  font-size: 2em;
  letter-spacing: 4px;
  border-bottom: 1px solid ${props => props.theme.bg_secondary};
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 2em;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.bg_secondary};
`;
const Body = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.bg_primary};
  padding-top: 30px;
  padding-bottom: 30px;
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
  xl: 18,
  md: 18,
  sm: 18,
  xs: 18,
  style: {
    display: "flex",
  },
};
const col2 = {
  xl: 3,
  md: 3,
  sm: 3,
  xs: 3,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
const col3 = {
  xl: 3,
  md: 3,
  sm: 3,
  xs: 3,
  style: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

class InputLayoutModal extends React.Component<Props> {
  public render() {
    const { input } = this.props;
    return (
      <Flex dir="c">
        <Header>{input.title.toUpperCase()}</Header>
        <Body>
          <Row>{this.props.actions}</Row>
          <Row>
            <Col {...col1}>
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
            <Col {...col2}>
              <RefreshIconBox
                active={this.props.input.status !== "untouched"}
                onClick={this.props.input.reset}
              >
                <RefreshIcon />
              </RefreshIconBox>
            </Col>
            <Col {...col3}>
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
          </Row>
          {this.props.additionalInfos && this.props.additionalInfos}
        </Body>
      </Flex>
    );
  }
}

export default InputLayoutModal;
