import * as React from "react";
import styled from "../../styled-components";
import { Itemplate } from "../../models/template.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  template: Itemplate;
  selectedTemplateId: string | null;
  index: number;
  selectTemplate: (templateId: string) => void;
  editTemplate: (template: Itemplate) => void;
  viewTemplate: (template: Itemplate) => void;
}

const Container = styled.div`
  width: 160px;
  height: auto;
  text-align: center;
`;

const TemplateItemBox: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  cursor: pointer;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Item: any = styled.div.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px dashed ${props => props.theme.disabled};
  &.active {
    border: 5px solid ${props => props.theme.primary};
  }
`;

const TemplateButton: any = styled.button.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  display: none;
  width: 130px;
  color: ${props => props.theme.font_secondary};
  background-color: ${props => props.theme.primary};
  cursor: pointer;
  outline: none;
  border: none;
  margin-bottom: 10px;
  z-index: 1;
  &.active {
    display: inline;
  }
`;

const Label = styled.div`
  width: 100%;
  text-align: center;
  z-index: 1;
  margin: auto;
`;

const TemplateItem: React.SFC<Props> = (props: Props) => (
  <Container>
    <TemplateItemBox>
      <TemplateButton
        onClick={() => props.editTemplate(props.template)}
        active={props.selectedTemplateId === props.template.id ? 1 : 0}
      >
        EDITER
        <FontAwesomeIcon icon="edit" style={{ marginLeft: "10px" }} />
      </TemplateButton>
      <TemplateButton
        onClick={() => props.viewTemplate(props.template)}
        active={props.selectedTemplateId === props.template.id ? 1 : 0}
      >
        INFOS
        <FontAwesomeIcon icon="eye" style={{ marginLeft: "10px" }} />
      </TemplateButton>
      <Item
        id={"template-container" + props.template.id}
        onClick={() => props.selectTemplate(props.template.id)}
        active={props.selectedTemplateId === props.template.id ? 1 : 0}
      />
    </TemplateItemBox>
    <Label>{props.template.label}</Label>
  </Container>
);

export default TemplateItem;
