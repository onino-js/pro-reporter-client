import { observable, action, toJS } from "mobx";
import { fabric } from "fabric";

export class CanvasStore {
  // Value

  // data
  @observable public id: string = "";
  @observable public canvas: any = null;
  @observable public canvasEl: any = null;
  @observable public canvasBox: any = null;
  @observable public resizeLoop: any = false;
  @observable public canvasHeight: any = false;
  @observable public canvasWidth: any = false;
  @observable public rotation: number = 90;

  constructor(options: any) {
    Object.assign(this, options);
  }

  @action.bound
  public initialize(data: any) {
    this.canvasEl = document.getElementById(this.id);
    this.canvasBox = document.getElementById("canvas-container" + this.id);
    this.canvas = new fabric.Canvas(this.id);
    this.canvas.isDrawingMode = true;
    data && this.addObjects([data]);
  }

  @action.bound
  public unmountCanvas() {
    this.canvas.removeListeners();
    this.stopResizeLoop();
    this.canvas.dispose();
  }

  @action.bound
  public getPng() {
    return this.canvas.toDataURL("image/png");
  }

  @action.bound
  public addImageToCanvas(dataUrl: string, callback: () => void) {
    fabric.Image.fromURL(dataUrl, (oImg: any) => {
      // oImg.scale(0.2);
      // oImg.rotate(90);
      this.styleControl(oImg);
      this.canvas.add(oImg);
      callback();
    });
  }

  // @action.bound
  // public restoreData(payload: any) {
  //   this.canvas.clear();
  //   this.addObjects([payload]);
  // }

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
  public resizeCanvas() {
    this.canvasWidth = this.canvasBox.offsetWidth;
    this.canvasHeight = this.canvasBox.offsetHeight;
    this.canvas.setDimensions({
      width: this.canvasWidth,
      height: this.canvasHeight,
    });
  }

  @action.bound
  public startResizeLoop() {
    const test =
      this.canvasWidth !== this.canvasBox.offsetWidth ||
      this.canvasHeight !== this.canvasBox.offsetHeight;
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
  public clearCanvas() {
    this.canvas && this.canvas.clear();
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
}
