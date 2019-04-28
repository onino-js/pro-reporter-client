import { observable, action, computed } from "mobx";
import { Report } from "../report";
import {
  IinputStatus,
  IinputBase,
  IinputJsonBase,
} from "../../models/template.model";

interface ISingleImageStoreParams {
  reportRef: Report;
  inputRef: IsingleImageInput;
  value: IsingleImageValue;
}

export type IsingleImageValue = string;
export interface IsingleImageInput extends IinputBase {
  value: IsingleImageValue;
  values: string[];
}
export interface IsingleImageJson extends IinputJsonBase {
  value: IsingleImageValue;
}
export interface IsingleImageJsonMap {
  [key: string]: IsingleImageJson;
}

export interface IsingleImageStoreConstructor {
  new(params: ISingleImageStoreParams): SingleImageStore;
}

export class SingleImageStore {
  @observable public id: string = "";
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public imageName: string = "";
  public reportRef: Report;
  public inputRef: IsingleImageInput;

  @computed
  get status(): IinputStatus {
    return this.value === "" ? "untouched" : "valid";
  }

  constructor(params: ISingleImageStoreParams) {
    this.value = params.value;
    this.id = params.inputRef.id;
    this.reportRef = params.reportRef;
    this.inputRef = params.inputRef;
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
  public uploadRequest() {
    document.getElementById("file-input-" + this.id)!.click();
  }

  @action.bound
  public addPhoto(file: any) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.value = reader.result as string;
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
      this.imageName = file.name;
    }
  }

  @action.bound
  public onPhotoUpload(e: any) {
    this.addPhoto(e.target.files[0]);
  }

  @action.bound
  public clone(input: SingleImageStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
    this.imageName = input.imageName;
  }

  public asJson(): IsingleImageJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): IsingleImageJsonMap {
    return {
      [this.id]: {
        id: this.id,
        value: this.value,
        status: this.status,
      },
    };
  }
}

export default SingleImageStore;
