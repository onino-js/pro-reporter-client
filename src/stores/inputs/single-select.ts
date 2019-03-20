import { observable, action } from "mobx";

export class SingleSelectStore {
  @observable public value: string = "";
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

  @action.bound
  public reset() {
    this.value = "";
  }
}

export default SingleSelectStore;
