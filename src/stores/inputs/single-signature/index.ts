import { IsingleSignatureJsonMap } from "./index";
import { IinputStatus } from "./../../../models/template.model";
import { observable, action, computed } from "mobx";
import uuid from "uuid/v1";
import { CanvasStore } from "./canvas-store";
import { Report } from "../../report";
import { IinputBase, IinputJsonBase } from "../../../models/template.model";

interface ISingleSignatureStoreParams {
  reportRef: Report;
  inputRef: IsingleSignatureInput;
  value: IsingleSignatureValue;
}

export type IsingleSignatureValue = string;
export interface IsingleSignatureInput extends IinputBase {
  value: IsingleSignatureValue;
  values: string[];
  options: {
    width: number;
    height: number;
  };
}
export interface IsingleSignatureJson extends IinputJsonBase {
  value: IsingleSignatureValue;
}
export interface IsingleSignatureJsonMap extends IsingleSignatureJson {}

export interface IsingleSignatureStoreConstructor {
  new (params: ISingleSignatureStoreParams): SingleSignatureStore;
}

export class SingleSignatureStore {
  @observable public id: string = "";
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public canvasId: string = "";
  @observable public canvasStore: CanvasStore = new CanvasStore({
    id: this.canvasId,
  });
  @observable public imageName: string = "";
  @observable public isEditVisible: boolean = false;
  @observable public original: string = "";
  public reportRef: Report;
  public inputRef: IsingleSignatureInput;

  @computed
  get status(): IinputStatus {
    return this.value === "" ? "untouched" : "valid";
  }

  constructor(params: ISingleSignatureStoreParams) {
    this.value = params.value;
    this.id = params.inputRef.id;
    this.reportRef = params.reportRef;
    this.inputRef = params.inputRef;
    this.canvasId = uuid();
    this.canvasStore = new CanvasStore({
      id: this.canvasId,
      width: params.inputRef.options.width,
      height: params.inputRef.options.height,
    });
  }

  @action.bound
  public initialize() {
    this.canvasStore && this.canvasStore.initialize();
  }

  @action.bound
  public setIsEditVisible(payload: boolean) {
    this.isEditVisible = payload;
    if (payload) {
      this.initialize();
    } else {
      this.canvasStore.unmountCanvas();
    }
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
  public validateCanvas() {
    this.value = this.canvasStore.getPng();
  }

  @action.bound
  public setOriginal(payload: string) {
    this.original = payload;
  }

  @action.bound
  public restore() {
    this.canvasStore.canvas.clear();
  }

  @action.bound
  public reset() {
    this.value = "";
    this.imageName = "";
    this.original = "";
    this.canvasStore && this.canvasStore.clearCanvas();
  }

  @action.bound
  public clone(input: SingleSignatureStore) {
    this.value = input.value;
    this.imageName = input.imageName;
    this.original = input.original;
  }

  public asJson(): IsingleSignatureJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): IsingleSignatureJsonMap {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }
}
