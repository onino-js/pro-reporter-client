import styled from "../../styled-components";

interface Iprops {
  dir?: "r" | "c";
  p?: string;
  m?: string;
  alignH?:
    | "space-between"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space around";
  alignV?:
    | "space-between"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space around";
  flex?: number | string;
  scrollY?: string;
}

export const Flex = styled.div<Iprops>`
  display: flex;
  padding: ${props => (props.p ? props.p : "0px")};
  margin: ${props => (props.m ? props.m : "0px")};
  flex-direction: ${props => (props.dir === "c" ? "column" : "row")};
  justify-content: ${props =>
    props.dir === "c" ? props.alignV : props.alignH};
  align-items: ${(props: Iprops) =>
    props.dir === "c" ? props.alignH : props.alignV};
  flex: ${props => (props.flex ? props.flex : "0 1 auto")};
  overflow-y: ${props => props.scrollY || "hidden"};
`;
