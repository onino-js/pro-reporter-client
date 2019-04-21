import { observable, action, toJS } from "mobx";
import { fabric } from "fabric";
import { Iedited } from ".";

export class CompareStore {
  // Value

  // data
  @observable public id: string = "";
  @observable public canvas: any = null;
  @observable public canvasEl: any = null;
  @observable public canvasBox: any = null;
  @observable public resizeLoop: any = false;
  @observable public canvasHeight: any = false;
  @observable public canvasWidth: any = false;
  @observable public width: any = false;
  @observable public height: any = false;
  @observable public rotation: number = 0;
  @observable public canvasMode: "free" | "hand" = "hand";

  constructor(options: any) {
    Object.assign(this, options);
  }

  @action.bound
  public initialize(data?: any, callbak?: (canvas: any) => void) {
    this.canvasEl = document.getElementById(this.id);
    this.canvas = new fabric.Canvas(this.id);
    data &&
      this.addObjects(data, () => {
        data && this.styleControl(data);
      });
    callbak && callbak(this.canvas);
  }

  @action.bound
  public unmountCanvas() {
    this.canvas.removeListeners();
    this.stopResizeLoop();
    this.clearSelection();
    this.canvas.dispose();
  }

  @action.bound
  public getPng() {
    return this.canvas.toDataURL("image/jpeg", 0.1);
  }

  @action.bound
  public addImageToCanvas(dataUrl: string, callback: any) {
    fabric.Image.fromURL(dataUrl, (oImg: any) => {
      // oImg.scale(0.2);
      // oImg.rotate(90);
      this.styleControl([oImg]);
      this.canvas.add(oImg);
      callback(this.canvas, oImg);
    });
  }

  // @action.bound
  // public restoreData(payload: any) {
  //   this.canvas.clear();
  //   this.addObjects([payload]);
  // }

  @action.bound
  public addObjects(payload: any, callback?: any) {
    fabric.util.enlivenObjects(
      payload,
      (objects: any) => {
        const origRenderOnAddRemove = this.canvas.renderOnAddRemove;
        this.canvas.renderOnAddRemove = false;
        objects.forEach((o: any) => {
          this.styleControl([o]);
          this.canvas.add(o);
        });
        this.canvas.renderOnAddRemove = origRenderOnAddRemove;
        this.canvas.renderAll();
        callback && callback();
      },
      "",
    );
  }

  // @action.bound
  // public savePhoto(photoType: keyof this) {
  //   const dataURL = this.canvas.toDataURL("image/png");
  //   this[photoType] = dataURL;
  // }

  @action.bound
  public resizeCanvas() {
    const canvasBox = document.getElementById(this.id)!.parentElement!
      .parentElement;
    const maxWidth = canvasBox!.offsetWidth;
    const maxHeight = canvasBox!.offsetHeight;
    const ratio1 = maxWidth / maxHeight;
    const ratio2 = this.width / this.height;
    const width = ratio1 <= ratio2 ? maxWidth : maxHeight * ratio2;
    const height = width / ratio2;
    this.canvas.setDimensions({
      width: width,
      height: height,
    });
  }

  @action.bound
  public startResizeLoop() {
    this.resizeCanvas();
    this.resizeLoop = window.setTimeout(this.startResizeLoop, 500);
  }

  @action.bound
  public stopResizeLoop() {
    if (this.resizeLoop) {
      window.clearTimeout(this.resizeLoop);
    }
  }

  @action.bound
  public clearCanvas() {
    this.canvas.clear();
  }

  @action.bound
  public getActiveObject() {
    return this.canvas.getActiveObject();
  }

  @action.bound
  public styleControl(items: any) {
    items.forEach((item: any) => {
      item.cornerSize = 20;
      item.cornerColor = "#1890ff";
      item.cornerStrokeColor = "#1890ff";
      item.transparentCorners = false;
      item.cornerStyle = "circle";
      return item;
    });
  }

  @action.bound
  public getData() {
    const res: any[] = [];
    if (!this.canvas.isEmpty()) {
      this.canvas.forEachObject((obj: any) => {
        // if (obj.excludeFromExport) return;
        res.push(obj.toJSON());
      });
    }
    return res;
  }

  @action.bound
  public clearSelection() {
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  // PHOTO EDITION

  @action.bound
  public rotate(sens: string) {
    const rotateValue = sens === "right" ? 90 : -90;
    this.rotation += rotateValue;
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      objs[0].centeredRotation = true;
      objs[0].rotate(this.rotation);
      this.canvas.requestRenderAll();
    }
  }

  @action.bound
  public scale(payload: number) {
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      const scale = objs[0].getObjectScaling().scaleX;
      const newScale = scale + payload;
      objs[0].scale(newScale);
      this.canvas.renderAll();
    }
  }

  @action.bound
  public center() {
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      objs[0].center();
      this.canvas.renderAll();
    }
  }

  @action.bound
  public adjust() {
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      if (
        objs[0].height / objs[0].width <=
        this.canvas.height / this.canvas.width
      ) {
        objs[0].scaleToWidth(this.canvas.width);
      } else objs[0].scaleToHeight(this.canvas.height);
      this.center();
      this.canvas.renderAll();
    }
  }

  // ******************************************************************************************
  // ******************************************************************************************
  // ADD ITEMS
  // ******************************************************************************************
  // ******************************************************************************************

  @action.bound
  public drawingModeOn() {
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.color = "#ef0707";
    this.canvas.freeDrawingBrush.width = 5;
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
      width: 70,
      height: 70,
      fill: "#ef0707",
      stroke: "#ef0707",
      strokeWidth: 4,
    });
    this.styleControl([rect]);
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
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
    this.styleControl([circle]);
    this.canvas.add(circle);
    this.canvas.setActiveObject(circle);
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
    this.styleControl([line]);
    this.canvas.add(line);
    this.canvas.setActiveObject(line);
  }

  @action.bound
  public addText() {
    const text = new fabric.IText("TEXT", {
      left: 100,
      top: 150,
      fill: "#ef0707",
      strokeWidth: 0,
      stroke: "#ef0707",
      fontFamily: "sans serif",
    });
    this.styleControl([text]);
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
  }

  // ******************************************************************************************
  // ******************************************************************************************
  // EDIT OBJECT
  // ******************************************************************************************
  // ******************************************************************************************

  @action.bound
  public toggleObjFond() {
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      objs.forEach((obj: any) => obj.set("fill", "transparent"));
    }
    this.canvas.renderAll();
  }

  @action.bound
  public changeObjColor(e: any) {
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      objs.forEach((obj: any) => obj.set("fill", e.target.value));
    }
    this.canvas.renderAll();
  }

  @action.bound
  public setObjectAttribute(value: any, attr: string) {
    const objs = this.canvas.getActiveObjects();
    if (objs.length !== 0) {
      objs.forEach((obj: any) => obj.set(attr, value));
    }
    this.canvas.renderAll();
  }
}
