import { observable, action } from "mobx";

export class SingleSelectStore {
  @observable public value: string = "";
  @observable public values: string[] = [];
  @observable public tempValue: string = "";
  @observable public mandatory: boolean = false;

  public title: string = "";

  get status() {
    return this.value === "" ? "untouched" : "valid";
  }

  constructor(options: any) {
    Object.assign(this, options);
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
}

export default SingleSelectStore;
