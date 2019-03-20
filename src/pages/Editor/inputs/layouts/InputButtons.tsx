import styled from "../../../../styled-components";

export const IconBox = styled.div`
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
    props.active
      ? props.theme[props.color || "secondary"]
      : props.theme[props.color || "disabled"]};
  color: ${props => props.theme.font_secondary};
  cursor: ${(props: any) => (props.active ? "pointer" : "not-allowed")};
  color: ${props => props.theme.font_secondary};
`;
