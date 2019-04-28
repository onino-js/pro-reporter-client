import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IProIconProps {
  m?: string;
  p?: string;
  w?: string;
  h?: string;
  scale?: "small" | "big";
  icon: IconProp;
}

export const ProIcon = styled(FontAwesomeIcon).attrs<IProIconProps>({
  icon: (props: IProIconProps) => props.icon,
})`
  font-size: ${(props: IProIconProps) =>
    props.scale === "small"
      ? _measures.font_small
      : props.scale === "big"
      ? _measures.font_big
      : _measures.font_default}px;
  width: ${props => props.w || "initial"};
  margin: ${props => props.m || "initial"};
  padding: ${props => props.p || "initial"};
`;
