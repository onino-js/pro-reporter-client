import * as React from "react";
import styled from "../../styled-components";
import {  SpiralSpinner } from "react-spinners-kit";
import { mainTheme } from "../../assets/styles/_colors";
import { Flex } from "./Flex";

interface Props {
  message?: string;
}
const SpinerBox = styled.div`
  margin-bottom: 40px;
`;

const MessageContent = styled.div`
  color : ${props => props.theme.secondary}
  max-width : 400px;
  font-size : 16px;
  text-align : center;
`;

// TODO : change spiner size  with media
const LoadingZone = (props : Props) => <Flex dir="c" flex="1" alignH="center" alignV="center">
      <SpinerBox>
        <SpiralSpinner
          size={140}
          frontColor={mainTheme.secondary}
          loading={true}
        />
      </SpinerBox>
      {props.message && (
        <MessageContent>{props.message}</MessageContent>
      )}
    </Flex>

export default LoadingZone;
