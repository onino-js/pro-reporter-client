import * as React from "react";
import styled from "../../../../styled-components";
import {
  CancelButton,
  OkButton,
  StatusButton,
  RefreshButton,
} from "../../../../components/ui/Buttons";
import { IinputStatus, IinputStore } from "../../../../models/template.model";
import InputDescriptionButton from "./InputDescriptionButton";

interface Props {
  label: string;
  onOk: () => void;
  onRefresh: () => void;
  onCancel: () => void;
  status: IinputStatus;
  additionalInfos?: React.ReactChild;
  description?: string;
  input: IinputStore;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputLabel = styled.div`
  width: 100%;
  letter-spacing: 3px;
  font-size: 1.2em;
  color: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  /* justify-content : space-between; */
`;

const Footer = styled.div`
  width: 100%;
  padding: 20px;
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
`;

const HeaderRight = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const StatusButtonBox = styled.div`
  margin-left: 10px;
  font-size: 1.5em;
`;

class InputLayoutDirect extends React.Component<Props> {
  public render() {
    const input= this.props.input
    return (
      <Container>
        <Header>
          <InputLabel>
            {this.props.description && <InputDescriptionButton input={input} />}
            {this.props.label}
          </InputLabel>
          <HeaderRight>
            <RefreshButton
              active={this.props.status !== "untouched"}
              onClick={this.props.onRefresh}
            />
            <StatusButtonBox>
              <StatusButton status={this.props.status} />
            </StatusButtonBox>
          </HeaderRight>
        </Header>
        <Body>{this.props.children}</Body>
        <Footer>
          <CancelButton onClick={this.props.onCancel}> ANNULER </CancelButton>
          <OkButton onClick={this.props.onOk}>CONFIRMER</OkButton>
        </Footer>
      </Container>
    );
  }
}

export default InputLayoutDirect;
