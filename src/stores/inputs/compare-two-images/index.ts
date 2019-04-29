import { Report } from "./../../report";
import { observable, action, toJS, computed } from "mobx";
import { message, Button } from "antd";
import uuid from "uuid/v1";
import { CompareStore } from "./compare-store";
import { fabric } from "fabric";
import {
  IinputBase,
  IinputJsonBase,
  IinputType,
  IinputStatus,
} from "../../../models/template.model";

export type Iedited = "before" | "after" | "bg";

export interface ICompareTwoImagesStoreParams {
  reportRef: Report;
  inputRef: IcompareTwoImagesInput;
  value: IcompareTwoImagesValue;
  data: ICompareTwoImagesStoreData;
}

export interface IcompareTwoImagesValue {
  after: string;
  before: string;
}
export interface IcompareTwoImagesInput extends IinputBase {
  value: IcompareTwoImagesValue;
  options: {
    width: number;
    height: number;
  };
}
export interface IcompareTwoImagesJson extends IinputJsonBase {
  value: IcompareTwoImagesValue;
  imageName: string;
  original: string;
  data: any;
}
export interface IcompareTwoImagesJsonMap extends IcompareTwoImagesJson {}
export interface IcompareTwoImagesStoreConstructor {
  new (params: ICompareTwoImagesStoreParams): CompareTwoImagesStore;
}

export interface ICompareTwoImagesStoreData {
  before: any[];
  after: any[];
  bg: any[];
}

export class CompareTwoImagesStore {
  @observable public id: string = "";
  @observable public value: IcompareTwoImagesValue = { before: "", after: "" };
  @observable public tempValue: any = { before: "", after: "" };

  @observable public data: ICompareTwoImagesStoreData = {
    before: [],
    after: [],
    bg: [],
  };
  @observable public tempData: ICompareTwoImagesStoreData = {
    before: [],
    after: [],
    bg: [],
  };
  @observable public canvasId: string = "";
  @observable public canvasStore: CompareStore = new CompareStore({
    id: this.canvasId,
    width: false,
    height: false,
  });
  @observable public imageName: string = "";
  @observable public isEditVisible: boolean = false;
  @observable public original: string = "";
  @observable public edited: Iedited = "before";
  @observable public isActiveSelection: boolean = false;
  @observable public isSideMenuOpen: boolean = false;
  @observable public isObjectEditOpen: boolean = false;
  @observable public activeObjects: any[] = [];

  public reportRef: Report;
  public inputRef: IcompareTwoImagesInput;

  @computed
  get status(): IinputStatus {
    return this.value.before === "" || this.value.after === ""
      ? "untouched"
      : "valid";
  }

  constructor(params: ICompareTwoImagesStoreParams) {
    this.value = params.value;
    this.id = params.inputRef.id;
    this.data = params.data;
    this.reportRef = params.reportRef;
    this.inputRef = params.inputRef;
    this.canvasId = uuid();
    this.canvasStore = new CompareStore({
      id: this.canvasId,
      width: params.inputRef.options.width,
      height: params.inputRef.options.height,
    });
  }

  @action.bound
  public initialize() {
    this.canvasStore &&
      this.canvasStore.initialize(this.data[this.edited]! as any[], (canvas:any) => {
        this.edited !== "bg" && this.data["bg"] && this.setBackground(canvas);
        this.addListeners(canvas);
      });
  }

  @action.bound
  public setIsSideMenuOpen(payload: boolean) {
    this.isSideMenuOpen = payload;
  }
  @action.bound
  public setIsObjectEditOpen(payload: boolean) {
    this.isObjectEditOpen = payload;
  }
  @action.bound
  public toggleIsSideMenuOpen(payload: boolean) {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  @action.bound
  public addListeners(canvas: any) {
    canvas.on("selection:updated", () => {
      this.isActiveSelection = true;
      this.activeObjects = this.canvasStore.canvas!.getActiveObjects();
    });
    canvas.on("selection:created", () => {
      this.isActiveSelection = true;
      this.activeObjects = this.canvasStore.canvas!.getActiveObjects();
    });
    canvas.on("selection:cleared", () => {
      this.isActiveSelection = false;
      this.activeObjects = [];
    });
    canvas.on("mouse:dblclick", () => this.setIsObjectEditOpen(true));
  }

  @action.bound
  public removeSelection() {
    const active = this.canvasStore.canvas!.getActiveObject();
    if (active !== null && active !== undefined) {
      if (active._objects) {
        active._objects.forEach((item: any) =>
          this.canvasStore.canvas!.remove(item),
        );
      } else {
        this.canvasStore.canvas!.remove(active);
      }
    }
    this.isActiveSelection = false;
  }

  @action.bound
  setBackground(canvas: any) {
    fabric.util.enlivenObjects(
      this.data["bg"],
      (objects: any) => {
        objects.forEach((o: any) => {
          canvas.setBackgroundImage(o);
        });

        canvas.renderAll();
      },
      "",
    );
  }

  @action.bound
  public setIsEditVisible(payload: boolean) {
    this.isEditVisible = payload;
    this.isSideMenuOpen = false;
    this.isObjectEditOpen = false;
    if (payload) {
      this.initialize();
    } else {
      this.canvasStore.unmountCanvas();
      this.activeObjects = [];
    }
  }

  @action.bound
  public setEdited(payload: Iedited) {
    this.edited = payload;
  }

  @action.bound
  public setValue(payload: string) {
    // TODO : arrange types
    //@ts-ignore
    this.value[this.edited] = payload;
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
  public clone(input: CompareTwoImagesStore) {
    this.value = { ...input.value };
    this.data = { ...input.data };
    this.tempData = { ...input.tempData };
    this.imageName = input.imageName;
    this.original = input.original;
  }

  @action.bound
  public toJS() {
    return {
      value: this.value,
      data: { ...this.data },
      tempData: { ...this.tempData },
      imageName: this.imageName,
      original: this.original,
    };
  }

  @action.bound
  public validateCanvas() {
    this.setData();
    this.tempData[this.edited] = this.data[this.edited];
    // .slice()
    // .map((item: any) => ({ ...item }));
    if (this.edited === "bg") {
      message.success(
        "La photo d'arrière plan a été ajoutée avec succes. Editer les images avent et après travaux",
      );
      this.value.before = "";
      this.value.after = "";
    }
    this.edited !== "bg" &&
      (this.value[this.edited] = this.canvasStore.getPng());
  }

  @action.bound
  public setOriginal(payload: string) {
    this.original = payload;
  }

  @action.bound
  public setData() {
    this.data[this.edited] = this.canvasStore.getData();
  }

  @action.bound
  public restore() {
    // this.canvasStore.canvas.clear();
    // this.canvasStore.addObjects([this.tempData[this.edited]]);
    this.data[this.edited] = this.tempData[this.edited];
    // .slice()
    // .map((item: any) => ({ ...item }));
  }

  @action.bound
  public reset() {
    this.value = {
      before: "",
      after: "",
    };
    this.data = {
      before: [],
      after: [],
      bg: [],
    };
    this.tempData = {
      before: [],
      after: [],
      bg: [],
    };
    this.imageName = "";
    this.original = "";
  }

  @action.bound
  public updateImage(e: any) {
    this.reset();
    const file = e.target.files[0];
    const reader = new FileReader();
    this.edited = "bg";
    this.initialize();
    reader.addEventListener(
      "load",
      () => {
        this.setOriginal(reader.result as string);
        // this.canvasStore.clearCanvas();
        this.canvasStore.addImageToCanvas(
          reader.result as string,
          (canvas: any, img: any) => {
            this.isEditVisible = true;
            //this.canvasStore.adjust();
            // this.setValue(this.canvasStore.getPng());
            this.data[this.edited] = this.canvasStore.getData();
            this.tempData[this.edited] = this.data[this.edited];
            canvas.setActiveObject(canvas.item(0));
            this.canvasStore.resizeCanvas();
            this.canvasStore.adjust();
            canvas.renderAll();
          },
        );
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
      this.imageName = file.name;
    }
  }

  @action.bound
  public asJson(): IcompareTwoImagesJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
      data: { ...this.data },
      imageName: this.imageName,
      original: this.original,
    };
  }

  @action.bound
  public asJsonMap(): IcompareTwoImagesJsonMap {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
      data: { ...this.data },
      imageName: this.imageName,
      original: this.original,
    };
  }
}
