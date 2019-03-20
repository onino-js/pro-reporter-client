import { observable, action } from "mobx";

export class NumberStore {
  @observable public value: number = 0;
  public title: string = "";
  get status() {
    return this.value === 0 ? "untouched" : "valid";
  }

  constructor(options: any) {
    Object.assign(this, options);
  }

  @action
  public setValue = (value: number): void => {
    this.value = value;
  };

  @action.bound
  public reset() {
    this.value = 0;
  }
}

export default NumberStore;
