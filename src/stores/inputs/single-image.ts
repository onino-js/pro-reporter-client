import { observable, action, computed } from "mobx";

export class SingleImageStore {
  @observable public id: string = "";
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public imageName: string = "";
  @observable public mandatory: boolean = false;

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
}

export default SingleImageStore;
