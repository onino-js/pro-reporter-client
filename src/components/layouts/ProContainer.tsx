import * as React from "react";
import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";

interface IProContainerProps {
  scrollY?: string;
}

export const ProContainer = styled.section<IProContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
  padding: 24px;
  margin: 0;
  overflow-y: ${(props: IProContainerProps) => props.scrollY || "hidden"};
  /* pointer-events: auto; */
  @media (max-width: ${_measures.tablet}px) {
    padding: 12px;
  }
`;
