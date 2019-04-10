import * as React from "react";
import styled from "../../../../styled-components";
import { _measures } from "../../../../assets/styles/_measures";

export const InputLabel = styled.div`
  letter-spacing: 3px;
  font-size: 1.1em;
  color: ${({ theme }) => theme.font_primary};
  @media (max-width: ${_measures.tablet}px) {
    font-size: 0.8em;
  }
`;

export const SubsectionLabel = styled.div`
  font-size: 2em;
  font-weight: 900;
  padding-top: 10px;
  padding-bottom: 30px;
  color: ${props => props.theme.font_primary};
  @media (max-width: ${_measures.tablet}px) {
    font-size: 1.2em;
  }
`;
