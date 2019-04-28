import * as React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import SubLayout from "../../components/layouts/SubLayout";
import SideNavigation from "../../components/navigation/SideNavigation";
import { ProContainer } from "../../components/layouts/ProContainer";
import pageInProgress from "./../../assets/images/page-in-progess.jpg";
import styled from "../../styled-components";
import { Flex } from "../../components/ui/Flex";
import { UiStore } from "../../stores/ui.store";

const Img = styled.img`
  height: 100px;
  width: auto;
  margin: 40px auto 40px auto;
`;

const Text = styled.p`
  margin: 0px auto;
  text-align: center;
  max-width: 500px;
  font-size: 24px;
`;
const Text2 = styled.p`
  margin: 0px auto;
  text-align: center;
  max-width: 500px;
  font-size: 14px;
  margin-top: 20px;
`;

interface Props {
  uiStore?: UiStore;
}
class DashBoard extends React.Component<Props> {
  public state = {
    activeItemIndex: 0,
  };

  public render() {
    return (
      <MainLayout>
        <SubLayout
          activePage="contacts"
          sideContent={<SideNavigation activePage={"dashboard"} />}
        >
          <ProContainer>
            <Flex dir="c" alignH="center" alignV="center">
              <Img src={pageInProgress} />
              <Text>Cette fonctionnalité n'est pas terminée</Text>
              <Text2>
                Vous êtes sur le tableau de bord. Ici vous avez un accés rapide
                aux informations et fonctionnalités de l'application.
              </Text2>
            </Flex>
          </ProContainer>
        </SubLayout>
      </MainLayout>
    );
  }
}

export default DashBoard;
