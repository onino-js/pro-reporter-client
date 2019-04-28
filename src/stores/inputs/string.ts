import { Report } from "./../report";
import { observable, action, computed } from "mobx";
import {
  IinputBase,
  IinputJsonBase,
  IinputStatus,
} from "../../models/template.model";

interface IStringStoreParams {
  reportRef: Report;
  inputRef: IstringInput;
  value: IstringValue;
}

export type IstringValue = string;
export interface IstringInput extends IinputBase {
  value: IstringValue;
  list?: string[];
}
export interface IstringInputJson extends IinputJsonBase {
  value: IstringValue;
}
export interface IstringInputJsonMap {
  [key: string]: IstringInputJson;
}
export interface IstringStoreConstructor {
  new (params: IStringStoreParams): StringStore;
}

export class StringStore {
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public id: string = "";
  public reportRef: Report;
  public inputRef: IstringInput;

  @computed
  get status(): IinputStatus {
    let status: IinputStatus = "valid";
    if (this.value === "") {
      status = "untouched";
    } else if (this.value.length < 2) {
      status = "error";
    } else {
      status = "valid";
    }
    return status;
  }

  constructor(params: IStringStoreParams) {
    this.value = params.value;
    this.id = params.inputRef.id;
    this.reportRef = params.reportRef;
    this.inputRef = params.inputRef;
  }

  @action
  public setValue = (value: string): void => {
    this.value = value;
    this.reportRef!.setStatus();
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
  public clone(input: StringStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
  }

  public asJson(): IstringInputJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): IstringInputJsonMap {
    return {
      [this.id]: {
        id: this.id,
        value: this.value,
        status: this.status,
      },
    };
  }
}

export default StringStore;
