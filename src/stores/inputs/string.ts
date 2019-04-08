import { observable, action, computed } from "mobx";

export class StringStore {
  @observable public value: string = "";
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

  @action.bound
  public reset() {
    this.value = "";
  }
}

export default StringStore;
