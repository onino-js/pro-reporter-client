import { observable, action } from "mobx";
import { Report } from "../report";
import {
  IinputBase,
  IinputJsonBase,
  IinputType,
  IinputStatus,
} from "../../models/template.model";

interface ISingleSelectStoreParams {
  reportRef: Report;
  inputRef: IsingleSelectInput;
  value: IsingleSelectValue;
}

export type IsingleSelectValue = string;
export interface IsingleSelectInput extends IinputBase {
  value: IsingleSelectValue;
  values: string[];
}
export interface IsingleSelectJson extends IinputJsonBase {
  value: IsingleSelectValue;
}
export interface IsingleSelectJsonMap {
  [key: string]: IsingleSelectJson;
}
export interface IsingleSelectStoreConstructor {
  new (params: ISingleSelectStoreParams): SingleSelectStore;
}

export class SingleSelectStore {
  @observable public id: string = "";
  @observable public type: IinputType = "single-select";
  @observable public value: string = "";
  @observable public values: string[] = [];
  @observable public tempValue: string = "";
  @observable public mandatory: boolean = false;
  public reportRef: Report;
  public inputRef: IsingleSelectInput;

  public title: string = "";

  get status(): IinputStatus {
    return this.value === "" ? "untouched" : "valid";
  }

  constructor(params: ISingleSelectStoreParams) {
    this.value = params.value;
    this.id = params.inputRef.id;
    this.reportRef = params.reportRef;
    this.inputRef = params.inputRef;
  }

  @action
  public setValue = (value: string): void => {
    this.value = value;
  };

  @action
  public confirmValue = (): void => {
    this.tempValue = this.value;
  };

  @action
  public retsoreValue = (): void => {
    this.value = this.tempValue;
  };

  @action.bound
  public reset() {
    this.value = "";
  }

  @action.bound
  public clone(input: SingleSelectStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
  }

  public asJson(): IsingleSelectJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): IsingleSelectJsonMap {
    return {
      [this.id]: {
        id: this.id,
        value: this.value,
        status: this.status,
      },
    };
  }
}

export default SingleSelectStore;
