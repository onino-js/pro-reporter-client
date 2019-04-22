import {
  Itemplate,
  Ireport,
  Iinput,
  IinputMap,
  IreportStatus,
  IreportObj,
} from "./../models/template.model";
import { observable, action, computed, toJS } from "mobx";
import { storeMapping } from "../services/input-mapping.service";

export class Report {
  @observable public inputs: any[] = [];
  @observable public id: string = "";
  @observable public userId: string = "";
  @observable public sections: any[] = [];
  @observable public templateId: string = "";
  @observable public templateName: string = "";
  @observable public creationDate: Date = new Date();
  @observable public lastModifiedDate: Date = new Date();
  @observable public status: IreportStatus = "new";

  constructor(newReport: Ireport) {
    Object.assign(this, newReport);
    this.inputs = [];
    newReport.inputs.forEach((input: any) => this.createInput(input));
    // this.createSections(newReport.sections);
  }

  @action.bound
  public setLastModifiedDate() {
    this.lastModifiedDate = new Date();
  }

  @action.bound
  public createInput(input: any) {
    const Store = storeMapping[input.type];
    this.inputs.push(new Store(input));
  }

  @action.bound
  public createSections(sections: any) {
    sections.forEach((section: any) => {
      this.sections.push(section);
    });
  }

  @action.bound
  public asJson(): Ireport {
    return {
      id: this.id,
      userId: this.userId,
      creationDate: this.creationDate.toString(),
      lastModifiedDate: this.lastModifiedDate.toString(),
      inputs: this.inputs.map(input => toJS(input)),
      templateId: this.templateId,
      templateName: this.templateName,
      sections: this.sections,
      status: this.status,
    };
  }

  @action.bound
  public asJsonObj(): IreportObj {
    const inputs: IinputMap = {};
    this.inputs.forEach(input => {
      //@ts-ignore
      inputs[input.id] = toJS(input);
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
