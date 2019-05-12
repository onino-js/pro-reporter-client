import * as React from "react";
import styled from "../../styled-components";

interface ITemplateMenuItemSmallProps {
  img: string;
  title: string;
  onClick: () => void;
}

const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 10px;
`;

const Title = styled.div`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  line-height: 40px;
  white-space: nowrap;
`;

export const TemplateMenuItemSmall: React.FC<ITemplateMenuItemSmallProps> = ({
  img,
  title,
  onClick,
}) => (
  <Container onClick={onClick}>
    <Img src={img} />
    <Title>{title}</Title>
  </Container>
);
