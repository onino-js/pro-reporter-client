import * as React from "react";
import { Row, Col, Dropdown, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "../../../../styled-components";
import { Flex } from "../../../../components/ui/Flex";
import {
  CancelButton,
  OkButton,
  RefreshButton,
  StatusButton,
} from "./EditorButtons";

interface Props {
  input: any;
  actions?: React.ReactChild[] | React.ReactChild;
  additionalInfos?: React.ReactChild;
  onOk: () => void;
  onCancel: () => void;
}

const Header = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 1.2em;
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
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
`;

const Footer = styled.div`
  width: 100%;
  height: 45px;
  padding-top: 5px;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.bg_secondary};
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

const SearchIcon = styled(FontAwesomeIcon).attrs({
  icon: "search",
})`
  font-size: 1.5em;
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
    minWidth: "50px",
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
    minWidth: "50px",
  },
};

class InputLayoutModal extends React.Component<Props> {
  public render() {
    const { input } = this.props;
    return (
      <Flex dir="c">
        <Header>{input.label.toUpperCase()}</Header>
        <Body>
          <Row>{this.props.actions}</Row>
          <Row style={{ width: "100%" }}>
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
              <RefreshButton
                active={this.props.input.status !== "untouched"}
                onClick={this.props.input.reset}
              />
            </Col>
            <Col {...col3}>
              <StatusButton status={this.props.input.status} />
            </Col>
          </Row>
          {this.props.additionalInfos && this.props.additionalInfos}
        </Body>
        <Footer>
          <CancelButton onClick={this.props.onCancel}>FERMER</CancelButton>
          <OkButton onClick={this.props.onOk}>OK</OkButton>
        </Footer>
      </Flex>
    );
  }
}

export default InputLayoutModal;
