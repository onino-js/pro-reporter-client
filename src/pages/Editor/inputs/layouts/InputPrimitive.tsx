import styled from "../../../../styled-components";

export const InputPrimitive = styled.input`
  width: 100%;
  flex : 1;
  border-radius: 0px;
  height: 50px;
  padding-left: 10px;
  font-size: 30px;
  /* font-weight : 900; */
  letter-spacing: 3px;
  /* border-width: 1px;
  border-color: ${props => props.theme.font_primary}; */
  outline : none;
  border : none;
  border-bottom: 1px solid ${props => props.theme.font_primary};
  color: ${props => props.theme.secondary};
  :focus {
    /* outline: 0;
    border-color: ${props => props.theme.secondary}; */
    transition: border-bottom-width 200ms ease-in-out;
    border-bottom-width: 3px;
  }
`;
