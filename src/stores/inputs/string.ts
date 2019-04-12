import { observable, action, computed } from "mobx";

export class StringStore {
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public id: string = "";
  @computed
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
  public clone(input : StringStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
  }
}

export default StringStore;
