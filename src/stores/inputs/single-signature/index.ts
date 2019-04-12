import { observable, action, toJS, computed } from "mobx";
import uuid from "uuid/v1";
import { CanvasStore } from "./canvas-store";

export class SingleSignatureStore {
  @observable public id: string = "";
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public data: any = {};
  @observable public tempData: any = {};
  @observable public canvasId: string = "";
  @observable public canvasStore: CanvasStore = new CanvasStore({
    id: this.canvasId,
  });
  @observable public imageName: string = "";
  @observable public isEditVisible: boolean = false;
  @observable public original: string = "";
  @observable public options: any = {};

  @computed
  get status() {
    return this.value === "" ? "untouched" : "valid";
  }

  constructor(options: any) {
    Object.assign(this, options);
    this.canvasId = uuid();
    this.canvasStore = new CanvasStore({ id: this.canvasId });
  }

  @action.bound
  public initialize() {
    this.canvasStore && this.canvasStore.initialize(this.data);
  }

  @action.bound
  public setIsEditVisible(payload: boolean) {
    this.isEditVisible = payload;
  }

  @action.bound
  public setValue(payload: string) {
    this.value = payload;
  }

  @action
  public confirmValue = (): void => {
    this.tempValue = this.value;
  };

  @action
  public retsoreValue = (): void => {
    this.value = this.tempValue;
  };

  @action.bound
  public validateCanvas(payload: string) {
    this.setData();
    this.tempData = this.data;
    this.value = this.canvasStore.getPng();
  }

  @action.bound
  public setOriginal(payload: string) {
    this.original = payload;
  }

  @action.bound
  public setData() {
    this.canvasStore.canvas && (this.data = this.canvasStore.getData()[0]);
  }

  @action.bound
  public restore() {
    this.canvasStore.canvas.clear();
    this.canvasStore.addObjects([this.tempData]);
  }

  @action.bound
  public reset() {
    this.value = "";
    this.data = {};
    this.tempData = {};
    this.imageName = "";
    this.original = "";
    this.canvasStore.clearCanvas();
  }
}
