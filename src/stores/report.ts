import { Itemplate } from "./../models/template.model";
import { observable, action, computed, toJS } from "mobx";
import { storeMapping } from "../services/input-mapping.service";

export class Report {
  @observable public inputs: any[] = [];
  @observable public id: string = "";
  @observable public sections: any[] = [];
  @observable public template: Itemplate | null = null;
  @observable public creationDate: Date = new Date();
  @observable public lastModifiedDate: Date = new Date();

  @computed
  get status() {
    let res = {};
    return res;
  }

  constructor({ template, id, inputs, sections }: any) {
    this.template = template;
    this.id = id;
    inputs.forEach((input: any) => this.createInput(input));
    this.createSections(sections);
  }

  @action.bound
  public setLastModifiedDate() {
    this.lastModifiedDate = new Date();
  }

  @action.bound
  public setTemplate(payload: Itemplate) {
    this.template = payload;
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
  public asJson() {
    const inputs = {};
    this.inputs.forEach(input => {
      //@ts-ignore
      inputs[input.id] = toJS(input);
    });
    return {
      id: this.id,
      creationDate: this.creationDate.toString(),
      lastModifiedDate: this.lastModifiedDate.toString(),
      inputs: inputs,
      templateId: this.template!.id,
    };
  }
}

export default Report;
