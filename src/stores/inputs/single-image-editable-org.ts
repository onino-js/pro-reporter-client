import { observable, action, toJS } from "mobx";
import { fabric } from "fabric";
import uuid from "uuid/v1";

interface Ipayload {
  key: keyof SingleImageEditableStore;
  value: any;
}

interface Iinitialize {
  canvasId: string;
  canvasType: string;
}

export class SingleImageEditableStore {
  // Value

  // data
  @observable public id: string = "";
  @observable public canvasId: string = "";
  @observable public value: string = "";
  @observable public original: string = "";
  @observable public imageName: string = "";
  @observable public canvasData: any = false;
  @observable public isEditVisible: boolean = false;

  constructor(options: any) {
    Object.assign(this, options);
    this.id = uuid();
    this.canvasId = "canvas-" + this.id;
  }

  @action.bound
  public unmountCanvas() {
    this.canvas.removeListeners();
    this.stopResizeLoop();
    this.canvas.dispose();
  }

  @action.bound
  public setIsEditVisible(payload: boolean) {
    this.isEditVisible = payload;
  }

  @action.bound
  public initialize() {
    // Build canvas
    this.canvasBox = document.getElementById(this.canvasId);
    this.canvas = new fabric.Canvas(this.canvasId);

    // If there are some objects saved, fill the canvas with it
    // if (this.photoObjects[canvasType]) {
    //   this.addObjects(this.photoObjects[canvasType]);
    // }
    //canvasType !== "photo" && this.setBackground();
    // this.canvas.on("mouse:dblclick", this.requestOpenItemOptions);
    // this.canvas.on("selection:updated", this.setActiveObj);
    // this.resizeCanvas();
    // this.startResizeLoop();
  }

  // @action.bound
  // public uploadRequest() {
  //   document.getElementById(this.id)!.click();
  // }

  @action.bound
  public updateImage(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.value = reader.result as string;
        this.canvas.clear();
        this.addImageToCanvas(reader.result as string);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
      this.imageName = file.name;
    }
  }

  @action.bound
  public saveImage(canvasType: string) {
    if (this.canvas.isEmpty()) {
      return;
    } else {
      this.photoObjects[canvasType] = [];
      this.canvas.forEachObject((obj: any) => {
        if (obj.excludeFromExport) return;
        const newObj = obj.toJSON();
        this.photoObjects[canvasType].push(newObj);
      });
    }
  }

  // @action.bound
  // public savePhoto(photoType: keyof this) {
  //   const dataURL = this.canvas.toDataURL("image/png");
  //   this[photoType] = dataURL;
  // }

  // ******************************************************************************************
  // ******************************************************************************************
  // CAVAS
  // ******************************************************************************************
  // ******************************************************************************************

  @action.bound
  public addImageToCanvas(dataUrl: string) {
    fabric.Image.fromURL(dataUrl, (oImg: any) => {
      // oImg.scale(0.2);
      // oImg.rotate(90);
      this.styleControl(oImg);
      this.canvas.add(oImg);
    });
  }

  @observable public photo: string = "";
  @observable public photoBeforeWork: string = "";
  @observable public photoAfterWork: string = "";
  @observable public photoObjects: any = {
    photo: false,
    photoBeforeWork: false,
    photoAfterWork: false,
  };

  // UI

  @observable public isCanvasItemOptionsVisible: boolean = false;
  @observable public isEditBgVisible: boolean = false;

  @observable public canvas: any = null;
  @observable public canvasBox: any = null;
  @observable public resizeLoop: any = false;
  @observable public canvasHeight: any = false;
  @observable public canvasWidth: any = false;
  @observable public background: any = false;
  @observable public bgRotation: number = 90;
  @observable public activeColor: string = "#ef0707";
  @observable public activeStrokeColor: string = "#ef0707";
  @observable public activeStrokeWidth: number = 2;
  @observable public activeObjOptions: any = {
    fill: "#ef0707",
    stroke: "#ef0707",
    strokeWidth: 2,
    opacity: 1,
  };
  @observable public activeObj: any = false;
  @observable public canvasMode: string = "hand";

  @action.bound
  public addObjects(payload: any) {
    if (payload.length === 0) return;
    fabric.util.enlivenObjects(
      payload,
      (objects: any) => {
        const origRenderOnAddRemove = this.canvas.renderOnAddRemove;
        this.canvas.renderOnAddRemove = false;
        objects.forEach((o: any) => {
          this.styleControl(o);
          this.canvas.add(o);
        });
        this.canvas.renderOnAddRemove = origRenderOnAddRemove;
        this.canvas.renderAll();
      },
      "",
    );
  }

  @action.bound
  public setBackground() {
    if (!this.photoObjects.photo || this.photoObjects.photo.length === 0)
      return;
    fabric.util.enlivenObjects(
      this.photoObjects.photo,
      (objects: any) => {
        const origRenderOnAddRemove = this.canvas.renderOnAddRemove;
        this.canvas.renderOnAddRemove = false;
        objects.forEach((o: any) => {
          this.canvas.setBackgroundImage(o);
        });
        this.canvas.renderOnAddRemove = origRenderOnAddRemove;
        this.canvas.renderAll();
      },
      "",
    );
  }

  // @action.bound
  // public saveCanvas(canvasType: string) {
  //   this.jsonCanvases[canvasType] = JSON.stringify(this.canvas);
  // }

  @action.bound
  public saveObjects(canvasType: string) {
    if (this.canvas.isEmpty()) {
      return;
    } else {
      this.photoObjects[canvasType] = [];
      this.canvas.forEachObject((obj: any) => {
        if (obj.excludeFromExport) return;
        const newObj = obj.toJSON();
        this.photoObjects[canvasType].push(newObj);
      });
    }
  }

  @action.bound
  public savePhoto(photoType: keyof this) {
    const dataURL = this.canvas.toDataURL("image/png");
    this[photoType] = dataURL;
  }

  @action.bound
  public hasBg() {
    if (this.photoObjects.bg[0] === undefined) {
      return false;
    } else {
      return true;
    }
  }

  @action.bound
  public requestOpenItemOptions(e: any) {
    this.activeObj = this.canvas.getActiveObject();
    if (e.target !== null) {
      const test =
        e.target.type === "rect" ||
        e.target.type === "circle" ||
        e.target.type === "i-text" ||
        e.target.type === "line";
      if (test) {
        this.isCanvasItemOptionsVisible = true;
      } else if (e.target.type === "image") {
        this.isEditBgVisible = true;
      }
    }
  }

  @action.bound
  public resizeCanvas() {
    this.canvasWidth = this.canvasBox!.offsetWidth;
    this.canvasHeight = this.canvasBox!.offsetHeight;
    this.canvas.setDimensions({
      width: this.canvasWidth,
      height: (this.canvasWidth * 200) / 260,
    });
    // this.canvas.setDimensions({
    //   width: this.canvasWidth,
    //   height: this.canvasHeight,
    // });
  }

  @action.bound
  public startResizeLoop() {
    const test =
      this.canvasWidth !== this.canvasBox!.offsetWidth ||
      this.canvasHeight !== this.canvasBox!.offsetHeight;
    if (test) {
      this.resizeCanvas();
    }
    this.resizeLoop = window.setTimeout(this.startResizeLoop, 500);
  }

  @action.bound
  public stopResizeLoop() {
    if (this.resizeLoop) {
      window.clearTimeout(this.resizeLoop);
    }
  }

  @action.bound
  public styleControl(item: any) {
    item.cornerSize = 20;
    item.cornerColor = "#1890ff";
    item.cornerStrokeColor = "#1890ff";
    item.transparentCorners = false;
    item.cornerStyle = "circle";
    return item;
  }

  @action.bound
  public clearCanvas() {
    this.canvas.clear();
  }

  @action.bound
  public clearSelection() {
    const active = this.canvas.getActiveObject();
    if (active !== null && active !== undefined) {
      if (active._objects) {
        active._objects.forEach((item: any) => this.canvas.remove(item));
      } else {
        this.canvas.remove(active);
      }
      this.activeObj = false;
    }
  }

  // ******************************************************************************************
  // ******************************************************************************************
  // CAVAS PHOTO EDIT
  // ******************************************************************************************
  // ******************************************************************************************

  @action.bound
  public rotateBackground(sens: string) {
    const rotateValue = sens === "right" ? 90 : -90;
    this.bgRotation += rotateValue;
    const objs = this.canvas.getObjects();
    if (objs.length !== 0) {
      objs[0].centeredRotation = true;
      objs[0].rotate(this.bgRotation);
      this.canvas.requestRenderAll();
    }
  }

  @action.bound
  public scale(payload: number) {
    const obj = this.canvas.getActiveObject();
    const scale = obj.getObjectScaling().scaleX;
    const newScale = scale + payload;
    obj.scale(newScale);
    this.canvas.renderAll();
  }

  @action.bound
  public center() {
    const obj = this.canvas.getActiveObject();
    obj.center();
    this.canvas.renderAll();
  }

  @action.bound
  public adjust() {
    const obj = this.canvas.getActiveObject();
    // obj.set("top", 0);
    // obj.set("left", 0);
    obj.scaleToWidth(this.canvas.width);
    this.center();
    // obj.left = 0;
    this.canvas.renderAll();
  }

  // ******************************************************************************************
  // ******************************************************************************************
  // ADD ITEMS
  // ******************************************************************************************
  // ******************************************************************************************

  @action.bound
  public drawingModeOn() {
    this.canvas.isDrawingMode = true;
    this.canvasMode = "free";
  }

  @action.bound
  public handModeOn() {
    this.canvas.isDrawingMode = false;
    this.canvasMode = "hand";
  }

  @action.bound
  public addSquare() {
    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: "#ef0707",
      stroke: "#ef0707",
      strokeWidth: 4,
    });
    this.canvas.add(this.styleControl(rect));
  }

  @action.bound
  public addCircle() {
    const circle = new fabric.Circle({
      top: 100,
      left: 100,
      radius: 50,
      fill: "#ef0707",
      stroke: "#ef0707",
      strokeWidth: 4,
    });
    this.canvas.add(this.styleControl(circle));
  }

  @action.bound
  public addLine() {
    const line = new fabric.Line([0, 0, 100, 100], {
      fill: "#ef0707",
      stroke: "#ef0707",
      strokeWidth: 1,
      selectable: true,
      evented: true,
    });
    this.canvas.add(this.styleControl(line));
  }

  @action.bound
  public addText() {
    const text = new fabric.IText("TEXT", {
      left: 100,
      top: 150,
      fill: "#ef0707",
      strokeWidth: 0,
      stroke: "#ef0707",
    });
    this.canvas.add(this.styleControl(text));
  }

  // ******************************************************************************************
  // ******************************************************************************************
  // EDIT ITEMS
  // ******************************************************************************************
  // ******************************************************************************************

  @action.bound
  public setActiveObj() {
    this.activeObj = this.canvas.getActiveObject();
    for (let key in this.activeObjOptions) {
      if (this.activeObj[key] && this.activeObj[key] !== undefined) {
        this.activeObjOptions[key] = this.activeObj[key];
      }
    }
    return this.activeObj;
  }

  @action.bound
  public toggleObjFond() {
    this.activeObj.set("fill", "transparent");
    this.canvas.renderAll();
  }

  @action.bound
  public changeObjColor(e: any) {
    this.activeObj.set("fill", e.target.value);
    this.activeObjOptions.fill = e.target.value;
    this.canvas.renderAll();
  }

  @action.bound
  public changeObjStrokeColor(e: any) {
    this.activeObj.set("stroke", e.target.value);
    this.activeObjOptions.stroke = e.target.value;
    this.canvas.renderAll();
  }

  @action.bound
  public changeObjOpacity(value: any) {
    this.activeObj.set("opacity", value);
    this.activeObjOptions.opacity = value;
    this.canvas.renderAll();
  }

  @action.bound
  public changeObjStrokeWidth(value: any) {
    this.activeObj.set("strokeWidth", value);
    this.activeObjOptions.strokeWidth = value;
    this.canvas.renderAll();
  }
}
