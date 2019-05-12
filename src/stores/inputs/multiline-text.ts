import { observable, action, computed } from "mobx";
import { Report } from "../report";
import {
  IinputStatus,
  IinputBase,
  IinputJsonBase,
} from "../../models/template.model";

interface IMultilineTextStoreParams {
  reportRef: Report;
  inputRef: ImultilineTextInput;
  value: ImultilineTextValue;
}

export type ImultilineTextValue = string;
export interface ImultilineTextInput extends IinputBase {
  value: ImultilineTextValue;
  values: string[];
}
export interface ImultilineTextJson extends IinputJsonBase {
  value: ImultilineTextValue;
}
export interface ImultilineTextJsonMap extends ImultilineTextJson {}

export interface ImultilineTextStoreConstructor {
  new (params: IMultilineTextStoreParams): MultilineTextStore;
}

export class MultilineTextStore {
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public id: string = "";
  public reportRef: Report;
  public inputRef: ImultilineTextInput;

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

  constructor(params: IMultilineTextStoreParams) {
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
    this.setValue(this.tempValue);
  };

  @action.bound
  public reset() {
    this.setValue("");
  }

  @action.bound
  public clone(input: MultilineTextStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
  }

  public asJson(): ImultilineTextJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): ImultilineTextJsonMap {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }
}

export default MultilineTextStore;
