import {
  IcompareTwoImagesInput,
  IcompareTwoImagesJson,
} from "./inputs/compare-two-images/index";
import {
  IinputMap,
  IinputStore,
  IinputJson,
  Iinput,
} from "./../models/template.model";
import { observable, action } from "mobx";
import { storeMapping } from "../services/input-mapping.service";
import templateStore from "./templateStore";
import { StringStore, IstringInput, IstringInputJson } from "./inputs/string";
import {
  SingleSelectStore,
  IsingleSelectInput,
  IsingleSelectJson,
} from "./inputs/single-select";
import {
  SingleImageStore,
  IsingleImageInput,
  IsingleImageJson,
} from "./inputs/single-image";
import {
  IsingleSignatureInput,
  SingleSignatureStore,
  IsingleSignatureJson,
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
  errorsNb: number;
  warningsNb: number;
  untouchedNb: number;
  validNb: number;
}

export interface IreportJson extends IreportBase {
  inputs: IinputJson[];
}

export interface IreportMap extends IreportBase {
  inputs: IinputMap;
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
  @observable public errorsNb: number = 0;
  @observable public warningsNb: number = 0;
  @observable public untouchedNb: number = 0;
  @observable public validNb: number = 0;

  @action.bound
  public setStatus() {
    this.computeStatusNumbers();
    if (this.untouchedNb === this.inputs.length) {
      this.status = "new";
    } else if (this.warningsNb > 0 && this.errorsNb === 0) {
      this.status = "warning";
    } else if (this.errorsNb > 0) {
      this.status = "error";
    } else {
      this.status = "valid";
    }
  }

  @action
  public computeStatusNumbers() {
    this.errorsNb = 0;
    this.warningsNb = 0;
    this.untouchedNb = 0;
    this.validNb = 0;
    this.inputs.forEach(i => {
      i.status === "untouched" &&
        i.inputRef!.mandatory &&
        (this.warningsNb += 1);
      i.status === "error" && (this.errorsNb += 1);
      i.status === "untouched" && (this.untouchedNb += 1);
      i.status === "valid" && (this.validNb += 1);
    });
  }

  constructor(newReport: IreportJson) {
    this.id = newReport.id;
    this.userId = newReport.userId;
    this.sections = newReport.sections;
    this.templateId = newReport.templateId;
    this.templateName = newReport.templateName;
    this.creationDate = new Date(newReport.creationDate);
    this.lastModifiedDate = new Date(newReport.lastModifiedDate);
    this.status = newReport.status;

    // Get back reference inputs from document
    const template = templateStore.templates.find(
      t => t.id === newReport.templateId,
    );
    // For each input in document, create reactive input store
    template &&
      template.inputs.forEach(iRef => {
        let iJson;
        // If newReport contains inputs, then get back values
        if (newReport.inputs.length !== 0) {
          iJson = newReport.inputs.find(i => i.id === iRef.id);
        }
        this.createInput(iRef, iJson);
      });
    //this.computeStatusNumbers();
    this.setStatus();
    // this.createSections(newReport.sections);
  }

  @action.bound
  public setLastModifiedDate() {
    this.lastModifiedDate = new Date();
  }

  // If IinputJson is undefined, then this is new document so apply default values
  @action.bound
  public createInput(inputRef: Iinput, input?: IinputJson) {
    let _input;
    switch (inputRef.type) {
      case "string":
        _input = input as IstringInputJson;
        this.inputs.push(
          new StringStore({
            reportRef: this,
            inputRef: inputRef as IstringInput,
            value: _input ? _input.value : "",
          }),
        );
        break;
      case "single-select":
        _input = input as IsingleSelectJson;
        this.inputs.push(
          new SingleSelectStore({
            reportRef: this,
            inputRef: inputRef as IsingleSelectInput,
            value: _input ? _input.value : "",
          }),
        );
        break;
      case "single-image":
        _input = input as IsingleImageJson;
        this.inputs.push(
          new SingleImageStore({
            reportRef: this,
            inputRef: inputRef as IsingleImageInput,
            value: _input ? _input.value : "",
          }),
        );
        break;
      case "single-signature":
        _input = input as IsingleSignatureJson;
        this.inputs.push(
          new SingleSignatureStore({
            reportRef: this,
            inputRef: inputRef as IsingleSignatureInput,
            value: _input ? _input.value : "",
          }),
        );
        break;
      case "compare-two-images":
        _input = input as IcompareTwoImagesJson;
        this.inputs.push(
          new CompareTwoImagesStore({
            reportRef: this,
            inputRef: inputRef as IcompareTwoImagesInput,
            value: _input
              ? _input.value
              : {
                  before: "",
                  after: "",
                },
            data:
              _input && _input.data
                ? _input!.data
                : {
                    before: [],
                    after: [],
                    bg: [],
                  },
          }),
        );
        break;
    }
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
      errorsNb: this.errorsNb,
      warningsNb: this.warningsNb,
      validNb: this.validNb,
      untouchedNb: this.untouchedNb,
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
      errorsNb: this.errorsNb,
      warningsNb: this.warningsNb,
      validNb: this.validNb,
      untouchedNb: this.untouchedNb,
    };
  }
}

export default Report;
