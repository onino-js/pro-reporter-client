import uuid from "uuid/v1";
import { observable, action } from "mobx";

export class SliderStore {
  @observable public id: string = "";
  @observable public svgId: string = "";
  @observable public value: number = 0;
  get status() {
    return this.value === 0 ? "untouched" : "valid";
  }

  constructor(options: any) {
    Object.assign(this, options);
    this.svgId = uuid();
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

export default SliderStore;
