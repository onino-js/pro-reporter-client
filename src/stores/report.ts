import { IcompareTwoImagesInput } from "./inputs/compare-two-images/index";
import {
  IinputMap,
  IinputStore,
  IinputJson,
  Iinput,
  IinputStoreConstructor,
} from "./../models/template.model";
import { observable, action, computed, toJS } from "mobx";
import { storeMapping } from "../services/input-mapping.service";
import templateStore from "./templateStore";
import { StringStore, IstringInput } from "./inputs/string";
import { SingleSelectStore, IsingleSelectInput } from "./inputs/single-select";
import { SingleImageStore, IsingleImageInput } from "./inputs/single-image";
import SingleSignatureInput from "../pages/Editor/inputs/SingleSignature/SingleSignatureInput";
import {
  IsingleSignatureInput,
  SingleSignatureStore,
} from "./inputs/single-signature";
import { CompareTwoImagesStore } from "./inputs/compare-two-images";

export type IreportStatus = "valid" | "new" | "warning" | "error";

export interface IreportBase {
  id: string;
  userId: string;
  sections: any[];
  templateId: string;
  templateName: string;
  creationDate: Date | string;
  lastModifiedDate: Date | string;
  status: IreportStatus;
}

export interface IreportJson extends IreportBase {
  inputs: IinputJson[];
}

export interface IreportMap extends IreportBase {
  inputs: IinputMap;
}

interface IReportParams extends IreportBase {
  inputs: Iinput[];
}

export class Report {
  @observable public inputs: IinputStore[] = [];
  @observable public id: string = "";
  @observable public userId: string = "";
  @observable public sections: any[] = [];
  @observable public templateId: string = "";
  @observable public templateName: string = "";
  @observable public creationDate: Date = new Date();
  @observable public lastModifiedDate: Date = new Date();
  @observable public status: IreportStatus = "new";

  @action.bound
  public setStatus() {
    let status: IreportStatus = "new";
    this.inputs.forEach(i => i.status === "warning" && (status = "warning"));
    this.inputs.forEach(i => i.status === "error" && (status = "error"));
    this.status = status;
  }

  constructor(newReport: IreportJson) {
    Object.assign(this, newReport);

    if (newReport.inputs.length === 0) {
      // Get back templates inputs
      const template = templateStore.templates.find(
        t => t.id === newReport.templateId,
      );
      template && template.inputs.forEach(i => this.createInputFromRef(i));
    } else {
      newReport.inputs.forEach(i => this.createInputFromValue(i));
    }

    this.setStatus();
    // this.createSections(newReport.sections);
  }

  @action.bound
  public setLastModifiedDate() {
    this.lastModifiedDate = new Date();
  }

  @action.bound
  public createInputFromRef(input: Iinput) {
    switch (input.type) {
      case "string":
        this.inputs.push(
          new StringStore({
            reportRef: this,
            inputRef: input as IstringInput,
            value: "",
          }),
        );
        break;
      case "single-select":
        this.inputs.push(
          new SingleSelectStore({
            reportRef: this,
            inputRef: input as IsingleSelectInput,
            value: "",
          }),
        );
        break;
      case "single-image":
        this.inputs.push(
          new SingleImageStore({
            reportRef: this,
            inputRef: input as IsingleImageInput,
            value: "",
          }),
        );
        break;
      case "single-signature":
        this.inputs.push(
          new SingleSignatureStore({
            reportRef: this,
            inputRef: input as IsingleSignatureInput,
            value: "",
            data: {},
          }),
        );
        break;
      case "compare-two-images":
        this.inputs.push(
          new CompareTwoImagesStore({
            reportRef: this,
            inputRef: input as IcompareTwoImagesInput,
            value: {
              before: false,
              after: false,
            },
            data: {},
          }),
        );
        break;
    }

    //@ts-ignore
    // const Store = storeMapping[input.type];
  }

  @action.bound
  public createInputFromValue(input: any) {
    //@ts-ignore
    const Store = storeMapping[input.type];
    this.inputs.push(
      new Store({
        reportRef: this,
      }),
    );
  }

  @action.bound
  public createSections(sections: any) {
    sections.forEach((section: any) => {
      this.sections.push(section);
    });
  }

  @action.bound
  public asJson(): IreportJson {
    return {
      id: this.id,
      userId: this.userId,
      creationDate: this.creationDate.toString(),
      lastModifiedDate: this.lastModifiedDate.toString(),
      inputs: this.inputs.map(input => input.asJson()),
      templateId: this.templateId,
      templateName: this.templateName,
      sections: this.sections,
      status: this.status,
    };
  }

  @action.bound
  public asJsonMap(): IreportMap {
    const inputs: IinputMap = {};
    this.inputs.forEach(input => {
      //@ts-ignore
      inputs[input.id] = input.asJsonMap();
    });
    return {
      id: this.id,
      userId: this.userId,
      creationDate: this.creationDate.toString(),
      lastModifiedDate: this.lastModifiedDate.toString(),
      inputs: inputs,
      templateId: this.templateId,
      templateName: this.templateName,
      sections: this.sections,
      status: this.status,
    };
  }
}

export default Report;
