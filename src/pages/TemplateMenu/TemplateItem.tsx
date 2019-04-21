import * as React from "react";
import styled from "../../styled-components";
import { Itemplate } from "../../models/template.model";

interface Props {
  template: Itemplate;
  selectedTemplateId: string | null;
  index: number;
  selectTemplate: (templateId: string) => void;
  editTemplate: (template: Itemplate) => void;
  viewTemplate: (template: Itemplate) => void;
}

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
  justify-content: space-around;
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

const EditButton: any = styled.button.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  display: none;
  color: ${props => props.theme.primary};
  z-index: 1;
  &.active {
    display: inline;
  }
`;

const Label = styled.div`
  width: 100%;
  text-align: center;
  z-index: 1;
`;

const ViewButton: any = styled.button.attrs({
  className: (props: any) => (props.active ? "active" : ""),
})`
  display: none;
  color: ${props => props.theme.primary};
  z-index: 1;
  &.active {
    display: inline;
  }
`;

const TemplateItem: React.SFC<Props> = (props: Props) => (
  <React.Fragment>
    <TemplateItemBox>
      <EditButton
        onClick={() => props.editTemplate(props.template)}
        active={props.selectedTemplateId === props.template.id ? 1 : 0}
      >
        EDITER
      </EditButton>
      <ViewButton
        onClick={() => props.viewTemplate(props.template)}
        active={props.selectedTemplateId === props.template.id ? 1 : 0}
      >
        INFOS
      </ViewButton>
      <Label>{props.template.label}</Label>
      <Item
        id={"template-container" + props.template.id}
        onClick={() => props.selectTemplate(props.template.id)}
        active={props.selectedTemplateId === props.template.id ? 1 : 0}
      />
    </TemplateItemBox>
  </React.Fragment>
);

export default TemplateItem;
