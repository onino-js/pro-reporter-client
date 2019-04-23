import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../models/all-stores.model";
import ProModal from "./ProModal";
import { ProContainer } from "../layouts/ProContainer";
import { TemplateStore } from "../../stores/templateStore";
import { Flex } from "../ui/Flex";
import styled from "../../styled-components";
import { ProMessage } from "../ui/Messages";
import { Col } from "antd";
import { UiStore } from "../../stores/ui.store";
import { ActionButton, HiddenInputFile, StatusButton } from "../ui/Buttons";
import { createImageFromSvg } from "../../services/app.service";

interface Props {
  uiStore?: UiStore;
  show: boolean;
  close: () => void;
  onOk: () => void;
  templateStore?: TemplateStore;
}

const TemplatePreview = styled.div`
  height: 100px;
  /* overflow-y: auto; */
  margin: 20px auto;
`;

const StepWrapper = styled.div`
  font-size: 24px;
  margin-right: 20px;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
  templateStore: allStores.templateStore,
}))
@observer
class NewTemplate extends React.Component<Props> {
  componentDidMount() {}

  private uploadRequest = () => {
    document.getElementById("new-template-input")!.click();
  };
  private uploadTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e &&
      e.target.files &&
      this.props.templateStore!.uploadTemplate(e.target.files[0]);
  };
  private validateMetaData = () => {
    this.props.templateStore!.validateMetaData();

    // TODO: GET IMAGE FROM SVG
    // const svgEl = document.getElementById("new-template-preview")!.innerHTML;
    // const smallImg = createImageFromSvg({
    //   svgEl: svgEl,
    //   width: 100,
    //   height: 100,
    // });
    // console.log(smallImg);
    // //var blob = new Blob([smallImg]);
    // saveAs(smallImg, "test.png");
  };
  private validateTemplateData = () => {
    this.props.templateStore!.validateTemplateData();
  };

  private close = () => {
    this.props.close();
    this.props.templateStore!.resetNewTemplate();
  };

  private onOk = () => {
    this.props.templateStore!.createTemplate();
    this.props.uiStore!.hideModal("new-template");
    this.props.templateStore!.resetNewTemplate();
  };

  public render() {
    const svgLoaded = this.props.templateStore!.newTemplateStatus.svgLoaded;
    const svgStatus = this.props.templateStore!.newTemplateStatus.svgStatus;
    const metadataStatus = this.props.templateStore!.newTemplateStatus
      .metadataStatus;
    const dataStatus = this.props.templateStore!.newTemplateStatus.dataStatus;
    const status = this.props.templateStore!.newTemplateStatus.status;
    const newTemplate = this.props.templateStore!.newTemplate;
    const inputs = newTemplate.inputs;
    return (
      <ProModal
        show={this.props.show}
        close={this.close}
        headerTitle={"Nouveau template"}
        onOk={status === "valid" ? this.onOk : undefined}
      >
        <ProContainer>
          <Flex flex="0 0 auto" alignH="space-between">
            <Flex alignV="center">
              <HiddenInputFile
                id={"new-template-input"}
                name="file"
                onChange={this.uploadTemplate}
                accept=".svg"
              />
              <StepWrapper>Etape 1 :</StepWrapper>
              <ActionButton
                title="Selectionnez un fichier"
                onClick={this.uploadRequest}
                m="0px 20px 0px 0px"
              />
              {this.props.templateStore!.newTemplateFileName}
            </Flex>
            <Flex>
              <StatusButton status={svgStatus} />
            </Flex>
          </Flex>
          <TemplatePreview id="new-template-preview" />

          {svgLoaded && (
            <Flex flex="0 0 auto" alignH="space-between" m="20px 0px">
              <Flex alignV="center">
                <StepWrapper>Etape 2 :</StepWrapper>
                <ActionButton
                  title="Vérifier les méta données"
                  onClick={this.validateMetaData}
                  m="0px 20px 0px 0px"
                  disabled={!svgLoaded}
                />
              </Flex>
              <Flex>
                <StatusButton status={metadataStatus} />
              </Flex>
            </Flex>
          )}

          {metadataStatus === "valid" && (
            <Flex dir="c" p="0px 20px">
              <Flex>
                <Col xl={6} xs={12}>
                  identifiant :
                </Col>
                <Col xl={6} xs={12}>
                  {newTemplate.id}
                </Col>
              </Flex>
              <Flex>
                <Col xl={6} xs={12}>
                  Nom du template :
                </Col>
                <Col xl={6} xs={12}>
                  {newTemplate.label}
                </Col>
              </Flex>
              <Flex>
                <Col xl={6} xs={12}>
                  Description :
                </Col>
                <Col xl={6} xs={12}>
                  {newTemplate.description || "NON DEFINI"}
                </Col>
              </Flex>
              <Flex>
                <Col xl={6} xs={12}>
                  Licence :
                </Col>
                <Col xl={6} xs={12}>
                  {newTemplate.licence || "NON DEFINI"}
                </Col>
              </Flex>
            </Flex>
          )}

          {metadataStatus === "valid" && (
            <Flex flex="0 0 auto" alignH="space-between" m="20px 0px">
              <Flex alignV="center">
                <StepWrapper>Etape 3 :</StepWrapper>
                <ActionButton
                  title="Vérifier les inputs"
                  onClick={this.validateTemplateData}
                  m="0px 20px 0px 0px"
                  disabled={!svgLoaded}
                />
              </Flex>
              <Flex>
                <StatusButton status={dataStatus} />
              </Flex>
            </Flex>
          )}

          {inputs.length !== 0 && (
            <Flex flex={1} scrollY={"auto"} dir="c" p="0px 20px">
              {inputs.map((input, index) => {
                return (
                  <Flex key={"new-template-input-" + index} flex="1 0 auto">
                    <Col xl={6} xs={6}>
                      {input.id}
                    </Col>
                    <Col xl={6} xs={6}>
                      {input.label}
                    </Col>
                    <Col xl={6} xs={6}>
                      {input.type}
                    </Col>
                  </Flex>
                );
              })}
            </Flex>
          )}

          <Flex dir="c" scrollY="auto" p="0px 20px">
            {this.props.templateStore!.newTemplateStatus.errors.map(
              (error, index) => (
                <ProMessage type="error" key={"template-error-" + index}>
                  {error.msg}
                </ProMessage>
              ),
            )}
          </Flex>
        </ProContainer>
      </ProModal>
    );
  }
}

export default NewTemplate;