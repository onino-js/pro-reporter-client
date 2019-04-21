import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const MessageBox = styled.div`
  display: flex;
  height: auto;
  flex-shrink: 0;
  width: 100%;
  padding: 20px;
  margin: 5px 0px;
  background-color: ${props => props.theme.disabled};
  &.error {
    color: #d8000c;
    background-color: #ffbaba;
  }
  &.success {
    color: #fff;
    background-color: ${props => props.theme.success};
  }
`;

const IconBox = styled.div`
  width: 40px;
`;

interface IProMessageProps {
  type: "error" | "succes";
  icon?: IconProp;
}

export const ProMessage: React.SFC<IProMessageProps> = props => (
  <MessageBox className={props.type}>
    <IconBox>
      <FontAwesomeIcon icon={props.icon || "exclamation"} />
    </IconBox>
    <div>{props.children}</div>
  </MessageBox>
);
