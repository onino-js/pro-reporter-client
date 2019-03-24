import styled from "../../styled-components";

interface Iprops {
  dir: "r" | "c";
  p: number;
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
  flex-direction: ${(props: Iprops) => (props.dir === "c" ? "column" : "row")};
  justify-content: ${(props: Iprops) =>
    props.dir === "c" ? props.alignV : props.alignH};
  align-items: ${(props: Iprops) =>
    props.dir === "c" ? props.alignH : props.alignV};
  flex: 1;
`;
