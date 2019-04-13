import * as React from "react";
import styled from "../../../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _measures } from "../../../../assets/styles/_measures";

// ICONS DEFINITIONS
export const RefreshIcon: any = styled(FontAwesomeIcon).attrs({
  icon: "sync-alt",
})`
  color: ${(props: any) => props.theme.font_secondary};
`;

export const SuccessIcon = styled(FontAwesomeIcon).attrs({
  icon: "check",
})`
  color: ${props => props.theme.font_secondary};
`;

// ICON BOXES DEFINITIONS
const IconBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 40px;
  outline: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: 30px;
    min-width: 30px;
  }
`;

export const SearchIconBox = IconBox.extend`
  /* border-bottom: 1px solid ${props => props.theme.font_primary}; */
  color: ${props => props.theme.font_primary};
`;

export const StatuIconBox: any = IconBox.extend`
  color: ${(props: any) => props.theme.font_secondary};
  background-color: ${(props: any) =>
    props.status === "valid" ? props.theme.success : props.theme.disabled};
`;

export const RefreshIconBox: any = IconBox.extend`
  background-color: ${(props: any) =>
    props.active ? props.theme.font_primary : props.theme.disabled};
  color: ${(props: any) => props.theme.font_secondary};
`;

export const ActionIconBox: any = IconBox.extend`
  background-color: ${(props: any) =>
    !props.disabled
      ? props.theme[props.color || "secondary"]
      : props.theme[props.color || "disabled"]};
  color: ${props => props.theme.font_secondary};
  cursor: ${(props: any) => (!props.disabled ? "pointer" : "not-allowed")};
`;

export const ActionLinkBox: any = styled.a`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  height: 40px;
  color: ${(props: any) =>
    !props.disabled ? props.theme["secondary"] : props.theme["disabled"]};
  cursor: ${(props: any) => (!props.disabled ? "pointer" : "not-allowed")};
`;

export const RefreshButton = (props: any) => (
  <RefreshIconBox active={props.active} onClick={props.onClick}>
    <FontAwesomeIcon icon="sync-alt" />
  </RefreshIconBox>
);

export const StatusButton = (props: any) => (
  <StatuIconBox status={props.status}>
    <FontAwesomeIcon
      icon={props.status === "valid" ? "check" : "exclamation-triangle"}
    />
  </StatuIconBox>
);

export const SearchButton = (props: any) => (
  <SearchIconBox>
    <FontAwesomeIcon icon="search" />
  </SearchIconBox>
);

const TextAction = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  font-size: 16px;
`;

export const ActionButton = (props: any) => (
  <ActionIconBox
    onClick={props.onClick}
    disabled={props.disabled}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    style={{ margin: props.m }}
  >
    {props.label && <TextAction>{props.label}</TextAction>}
    {props.icon && (
      <FontAwesomeIcon icon={props.icon} style={{ fontSize: "14px" }} />
    )}
  </ActionIconBox>
);

export const ActionLink = (props: any) => (
  <ActionLinkBox
    onClick={props.onClick}
    disabled={props.disabled}
    //style={{ margin: props.m }}
  >
    {props.label && <TextAction>{props.label}</TextAction>}
    {props.icon && (
      <FontAwesomeIcon icon={props.icon} style={{ fontSize: "14px" }} />
    )}
  </ActionLinkBox>
);

export const SelectButton = styled.button`
  text-decoration: none;
  min-width: 70px;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.font_primary};
  color: ${({ theme }) => theme.font_primary};
  background-color: transparent;
  cursor: pointer;
  &.active {
    background-color: ${({ theme }) => theme.secondary};
    /* border: ${({ theme }) => theme.font_secondary}; */
    color: ${({ theme }) => theme.font_secondary};
    font-weight: 900;
  }
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const OkButton = styled.button`
  background-color: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.font_secondary};
  height: 40px;
  cursor: pointer;
  width: 120px;
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: 30px;
    width: 90px;
  }
`;

export const NormalButton: any = styled.button.attrs({
  className: (props: any) => (props.disabled ? "disabled" : ""),
  disabled: (props: any) => props.disabled,
})`
  background-color: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.font_secondary};
  height: 40px;
  cursor: pointer;
  width: 120px;
  &.disabled {
    color: #fff;
    background-color: ${props => props.theme.disabled};
  }
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: 30px;
  }
`;

export const CancelButton = styled.button`
  background-color: transparent;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid ${props => props.theme.font_secondary};
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
  height: 40px;
  width: 120px;
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: 30px;
    width: 90px;
  }
`;

export const HiddenInputFile = styled.input.attrs({
  type: "file",
})`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
