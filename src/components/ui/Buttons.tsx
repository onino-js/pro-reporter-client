import * as React from "react";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _measures } from "../../assets/styles/_measures";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getStatusColor, getStatusIcon } from "../../services/template.service";
import { Menu, Dropdown } from "antd";
import { IreportStatus } from "../../stores/report";
import { IinputStatus } from "../../models/template.model";
import { ItemplateStatus } from "../../stores/templateStore";

export const IconBox = styled.button<IIconBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props: IIconBoxProps) =>
    props.size === "big" ? "40px" : props.size === "small" ? "20px" : "30px"};
  font-size: 1em;
  min-width: 30px;
  outline: none;
  border: none;
  cursor: pointer;
`;

interface IIconBoxProps {
  size?: "big" | "small";
}

export const SearchIconBox = styled(IconBox)`
  border-bottom: 1px solid ${props => props.theme.font_primary};
  color: ${props => props.theme.font_primary};
`;

export const RefreshIconBox: any = styled(IconBox)`
  background-color: ${(props: any) =>
    !props.active ? props.theme.font_primary : props.theme.disabled};
`;

export const ActionIconBox: any = styled(IconBox)`
  margin-left: 10px;
  background-color: ${(props: any) =>
    !props.disabled
      ? props.theme[props.color || "secondary"]
      : props.theme[props.color || "disabled"]};
  color: ${props => props.theme.font_secondary};
  cursor: ${(props: any) => (!props.disabled ? "pointer" : "not-allowed")};
`;

interface IActionButtonBoxProps {
  onClick: () => void;
  icon?: IconProp;
  disabled?: boolean;
  m?: string;
  r?: boolean;
  h?: boolean;
  w?: boolean;
  size?: string;
}

const ActionButtonBox = styled.button.attrs<IActionButtonBoxProps>({
  className: (props: IActionButtonBoxProps) =>
    `${props.size} ${props.disabled ? "disabled" : ""}`,
  disabled: (props: IActionButtonBoxProps) => props.disabled,
})`
  height: 30px;
  min-width: 30px;
  line-height: 30px;
  display: flex;
  flex-shrink : 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  border: none;
  font-size : 14px;
  outline: none;
  margin : ${props => props.m}
  color: ${props => props.theme.font_secondary};
  cursor: ${props => (!props.disabled ? "pointer" : "not-allowed")};
  background-color: ${props => props.theme.secondary};
  &.disabled {
    background-color: ${props => props.theme.disabled};
  }
  &.big{
    height: 40px;
    min-width: 40px;
    line-height: 40px;
  }
  /* @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: ${props => (props.r ? "30px" : "40px")};
    min-width: ${props => (props.r ? "30px" : "40px")};
    line-height: ${props => (props.r ? "30px" : "40px")};
  } */
`;

interface IActionButtonLabelProps {
  pr: string;
}

const ActionButtonLabel = styled.div<IActionButtonLabelProps>`
  font-size: 12px;
  height: 100%;
  padding-left: 10px;
  padding-right: ${(props: IActionButtonLabelProps) => props.pr};
`;

interface IActionButtonProps {
  title?: string;
  onClick?: () => void;
  icon?: IconProp;
  disabled?: boolean;
  m?: string;
  h?: boolean;
  w?: boolean;
  size?: string;
  r?: boolean;
}

export const ActionButton: React.SFC<IActionButtonProps> = ({
  title,
  onClick,
  icon,
  disabled = false,
  m = "0px",
  h = false,
  w = false,
  size = "normal",
}: IActionButtonProps) => (
  <ActionButtonBox
    onClick={onClick || (() => {})}
    disabled={disabled}
    size={size}
    m={m}
    h={h}
    w={w}
  >
    {title && (
      <ActionButtonLabel pr={icon ? "0px" : "10px"}>{title}</ActionButtonLabel>
    )}
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        style={{ marginRight: "10px", marginLeft: "10px" }}
      />
    )}
  </ActionButtonBox>
);

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

export const OkButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.font_secondary};
  border: none;
  margin-left: 10px;
  margin-right: 10px;
  height: 30px;
  cursor: pointer;
  width: 90px;
`;

export const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.font_secondary};
  color: ${props => props.theme.font_secondary};
  cursor: pointer;
  height: 30px;
  width: 90px;
`;

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

interface IStatusButtonProps extends IIconBoxProps {
  status: IreportStatus | IinputStatus | ItemplateStatus;
  mandatory?: boolean;
}

export const StatuIconBox = styled(IconBox as any)<IStatusButtonProps>`
  /* color: ${(props: any) => props.theme.font_secondary}; */
  color: ${(props: IStatusButtonProps) =>
    getStatusColor(props.status, props.mandatory)};
  background-color : transparent;
`;

export const StatusButton = (props: IStatusButtonProps) => (
  <StatuIconBox status={props.status} mandatory={props.mandatory}>
    <FontAwesomeIcon icon={getStatusIcon(props.status)} />
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
   font-size: 1em;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
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
`;

export const NormalButton: any = styled.button.attrs({
  className: (props: any) => (props.disabled ? "disabled" : ""),
  disabled: (props: any) => props.disabled,
})`
  background-color: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.font_secondary};
  height: 30px;
  cursor: pointer;
  width: 90px;
  &.disabled {
    color: #fff;
    background-color: ${props => props.theme.disabled};
  }
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1em;
    height: 30px;
  }
`;

export const ProMenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProMenuIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1em;
`;

interface IProDropdownProps {
  m?: string;
}

export const ProDropdown = styled(Dropdown).attrs<IProDropdownProps>({
  trigger: ["click"],
})`
  height: 100%;
  line-height: 40px;
  margin: ${props => props.m || "0px"};
`;
