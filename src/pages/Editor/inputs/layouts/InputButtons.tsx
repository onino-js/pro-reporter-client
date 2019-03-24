import * as React from "react";
import styled from "../../../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconBox = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-bottom: 1px solid ${props => props.theme.font_primary}; */
  color: ${props => props.theme.font_primary};
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

export const SearchIconBox = IconBox.extend`
  border-bottom: 1px solid ${props => props.theme.font_primary};
  color: ${props => props.theme.font_primary};
`;

export const RefreshIconBox: any = IconBox.extend`
  background-color: ${(props: any) =>
    props.active ? props.theme.font_primary : props.theme.disabled};
`;

export const ActionIconBox: any = IconBox.extend`
  margin-left: 10px;
  background-color: ${(props: any) =>
    !props.disabled
      ? props.theme[props.color || "secondary"]
      : props.theme[props.color || "disabled"]};
  color: ${props => props.theme.font_secondary};
  cursor: ${(props: any) => (!props.disabled ? "pointer" : "not-allowed")};
`;

const ActionButtonBox: any = styled.button`
  height: 40px;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: space-between;
  border: none;
  outline: none;
  margin: 10px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  background-color: ${(props: any) =>
    props.active
      ? props.theme[props.color || "secondary"]
      : props.theme[props.color || "disabled"]};
  color: ${props => props.theme.font_secondary};
  cursor: ${(props: any) => (props.active ? "pointer" : "not-allowed")};
  .pr-icon {
    margin-left: 10px;
  }
`;

const IconWrapper = styled.div`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-bottom: 1px solid ${props => props.theme.font_primary}; */
  color: ${props => props.theme.font_secondary};
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  height: 40px;
  padding: 0;
`;

export const ActionButton: any = ({
  title,
  onClick,
  icon,
  disabled = false,
}: any) => (
  <ActionButtonBox onClick={onClick} active={!disabled} disabled={disabled}>
    {title && <TitleBox> {title} </TitleBox>}
    {icon && <FontAwesomeIcon className="pr-icon" icon={icon} />}
  </ActionButtonBox>
);
