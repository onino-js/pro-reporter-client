import { observable, action, computed } from "mobx";
import uuid from "uuid/v1";

export class SingleImageStore {
  @observable public id: string = "";
  @observable public value: string = "";
  @observable public imageName: string = "";
  @computed
  get status() {
    return this.value === "" ? "untouched" : "valid";
  }

  constructor(options: any) {
    Object.assign(this, options);
    this.id = uuid()
  }

  @action
  public setValue = (value: string): void => {
    this.value = value;
  };

  @action.bound
  public reset() {
    this.value = "";
  }

  @action.bound
  public uploadRequest() {
    document.getElementById(this.id)!.click();
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
}

export default SingleImageStore;
