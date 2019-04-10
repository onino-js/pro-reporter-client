import styled from "../../styled-components";

export const SmallBullet: any = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: any) =>
    props.mandatory ? props.theme.danger : props.theme.grey};
`;
