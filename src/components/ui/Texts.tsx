import styled from "../../styled-components";
import { _measures } from "../../assets/styles/_measures";

export const Title1 = styled.div`
  font-size: 2em;
  font-weight: 900;
  padding-top: 10px;
  padding-bottom: 30px;
  color: ${props => props.theme.font_primary};
`;

interface ITextBaseProps {
  m?: string;
  p?: string;
  w?: string;
  align?: string;
}

export const TextBase = styled.span<ITextBaseProps>`
  font-size: ${_measures.font_default}px;
  text-align: ${(props: ITextBaseProps) => props.align || "initial"};
  width: ${(props: ITextBaseProps) => props.w || "initial"};
  margin: ${(props: ITextBaseProps) => props.m || "initial"};
  padding: ${(props: ITextBaseProps) => props.p || "initial"};
`;

export const TextDanger = styled(TextBase)`
  color: ${props => props.theme.danger};
`;
