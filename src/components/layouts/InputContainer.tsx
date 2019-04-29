import styled from "../../styled-components";

interface IInputContainerProps {
  visible?: boolean;
}

export const InputContainer: any = styled.div<IInputContainerProps>`
  display: ${(props: IInputContainerProps) =>
    props.visible ? "flex" : "none"};
  background-color: ${props => props.theme.bg_secondary};
  border-top: 5px solid ${props => props.theme.secondary};
  flex-direction: column;
  animation-name: animatetop;
  animation-duration: 0.4s;
  @keyframes animatetop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
