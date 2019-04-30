import * as React from "react";
import styled from "../../styled-components";
import { IinputStatus } from "../../models/template.model";
import { getStatusColor } from "../../services/template.service";
import Color from "color";

interface Props {
  count: number;
  status: IinputStatus;
}

interface IContainerProps {
  color: string;
}

const Container = styled.span<IContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink : 0;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size : 10px;
  font-weight : bolder;
  /* border: 1px solid ${props => props.theme.primary}; */
  background-color: ${props => props.color};
  color : #FFF;
  margin-left: 5px;
`;

class BulletNumber extends React.Component<Props> {
  public render() {
    const color = getStatusColor(this.props.status);
    const displayedColor =
      this.props.count === 0
        ? Color(color)
            .alpha(0.3)
            .lighten(0.3)
            .string()
        : color;
    return <Container color={displayedColor}>{this.props.count}</Container>;
  }
}

export default BulletNumber;
