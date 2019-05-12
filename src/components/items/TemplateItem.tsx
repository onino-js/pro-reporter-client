import * as React from "react";
import { ProDropdown, ActionButton } from "../../components/ui/Buttons";
import { Menu, Dropdown } from "antd";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import { TemplateStore } from "../../stores/templateStore";
import { Flex } from "../ui/Flex";
import styled from "../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Itemplate } from "../../models/template.model";
import { FirebaseStore } from "../../stores/firebaseStore";
import { formatDate } from "../../services/app.service";
import { _measures } from "../../assets/styles/_measures";

interface Props {
  firebaseStore?: FirebaseStore;
  template: Itemplate;
  // filterTemplate: (id: string) => void;
  // selectedTemplateId: string | null;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  height: 140px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0px;
`;

const Left = styled.div`
  width: auto;
  height: auto;
  padding-right: 10px;
`;

const ImgBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  overflow: hidden;
  @media (max-width: ${_measures.mobile}px) {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Middle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Right = styled.div`
  width: auto;
  height: auto;
  padding-left: 20px;
`;

const TemplateTitle = styled.span`
  font-size: 1.3em;
`;
const TemplateSubInfo = styled.span`
  font-size: 0.8em;
  margin-bottom: 15px;
`;
const TemplateDescription = styled.span`
  /* font-size: 1em;
  overflow: hidden;
  text-overflow: ellipsis; */
  height: 60px;
  font-size: 0.8em;
  overflow: hidden;
  position: relative;
  line-height: 15px;
  max-height: 6em;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
  :before {
    content: "...";
    position: absolute;
    right: 0;
    bottom: 0;
  }
  :after {
    content: "";
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }
`;

const ActionBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.secondary};
`;

const MenuItem = styled(Menu.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  font-size: 1em;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  firebaseStore: allStores.firebaseStore,
}))
@observer
class TemplateItem extends React.Component<Props> {
  private delete = () => {
    this.props.firebaseStore!.deleteTemplate(this.props.template.id);
  };
  public render() {
    const actionMenu = (
      <Menu>
        <MenuItem onClick={this.delete}>
          Supprimer <MenuIcon icon="trash" />
        </MenuItem>
      </Menu>
    );
    const template = this.props.template;
    return (
      <Container>
        <Left>
          <ImgBox>
            <Img src={template.imgPath} />
          </ImgBox>
        </Left>
        <Middle>
          <TemplateTitle>{template.label}</TemplateTitle>
          <Flex alignH="space-between">
            <TemplateSubInfo>{template.author}</TemplateSubInfo>
            <TemplateSubInfo>
              {formatDate(template.creationDate)}
            </TemplateSubInfo>
          </Flex>
          <TemplateDescription>{template.description}</TemplateDescription>
        </Middle>
        <Right>
          <Dropdown overlay={actionMenu} trigger={["click"]}>
            <ActionBox>
              <FontAwesomeIcon icon="ellipsis-h" />
            </ActionBox>
          </Dropdown>
        </Right>
      </Container>
    );
  }
}

export default TemplateItem;
