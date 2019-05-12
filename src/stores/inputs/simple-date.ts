import { observable, action, computed } from "mobx";
import { Report } from "../report";
import {
  IinputStatus,
  IinputBase,
  IinputJsonBase,
} from "../../models/template.model";

interface ISimpleDateStoreParams {
  reportRef: Report;
  inputRef: IsimpleDateInput;
  value: IsimpleDateValue;
}

export type IsimpleDateValue = string;
export interface IsimpleDateInput extends IinputBase {
  value: IsimpleDateValue;
  values: string[];
}
export interface IsimpleDateJson extends IinputJsonBase {
  value: IsimpleDateValue;
}
export interface IsimpleDateJsonMap extends IsimpleDateJson {}

export interface IsimpleDateStoreConstructor {
  new (params: ISimpleDateStoreParams): SimpleDateStore;
}

export class SimpleDateStore {
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public id: string = "";
  public reportRef: Report;
  public inputRef: IsimpleDateInput;

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

  constructor(params: ISimpleDateStoreParams) {
    this.value = params.value;
    this.tempValue = params.value;
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
    console.log(this.tempValue);
    this.setValue(this.tempValue);
  };

  @action.bound
  public reset() {
    this.setValue("");
  }

  @action.bound
  public clone(input: SimpleDateStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
  }

  public asJson(): IsimpleDateJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): IsimpleDateJsonMap {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }
}

export default SimpleDateStore;
