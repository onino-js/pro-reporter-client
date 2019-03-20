import * as React from "react";
import styled from "../../styled-components";

interface Props {
  items: any[];
  activeItemIndex: number;
  onChange: (a: number) => void;
}

const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex start;
  width: 100%;
  height: 40px;
  color: ${props => props.theme.primary};
`;

const Tab = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 3px solid transparent;
  transition: border-bottom 300ms ease-in-out;
  &.active {
    border-bottom: 3px solid ${props => props.theme.primary};
  }
  padding-right: 5px;
  padding-left: 5px;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

class TabMenu extends React.Component<Props> {
  public render() {
    return (
      <Container>
        {this.props.items.map((item, index) => (
          <Tab
            key={"tab-" + index}
            className={this.props.activeItemIndex === index ? "active" : ""}
            onClick={() => this.props.onChange(index)}
          >
            {item}
          </Tab>
        ))}
      </Container>
    );
  }
}

export default TabMenu;
