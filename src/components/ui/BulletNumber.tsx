import * as React from "react";
import styled from "../../styled-components";

interface Props {
  count: number;
  active?: any;
}

const Container = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  margin-left: 10px;
`;

class BulletNumber extends React.Component<Props> {
  public render() {
    return <Container>{this.props.count}</Container>;
  }
}

export default BulletNumber;
