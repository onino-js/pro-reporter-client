import styled from "../../styled-components";

interface Iprops {
  dir: "r" | "c";
  p: number;
  mt: number;
  mb: number;
  ml: number;
  mr: number;
  alignH:
    | "space-between"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space around";
  alignV:
    | "space-between"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space around";
}

export const Flex: any = styled.div`
  display: flex;
  padding: ${(props: Iprops) => (props.p ? props.p : 0)}px;
  margin-top: ${(props: Iprops) => (props.mt ? props.mt : 0)}px;
  margin-bottom: ${(props: Iprops) => (props.mb ? props.mb : 0)}px;
  margin-left: ${(props: Iprops) => (props.ml ? props.ml : 0)}px;
  margin-right: ${(props: Iprops) => (props.mr ? props.mr : 0)}px;
  flex-direction: ${(props: Iprops) => (props.dir === "c" ? "column" : "row")};
  justify-content: ${(props: Iprops) =>
    props.dir === "c" ? props.alignV : props.alignH};
  align-items: ${(props: Iprops) =>
    props.dir === "c" ? props.alignH : props.alignV};
  flex: 1;
`;
